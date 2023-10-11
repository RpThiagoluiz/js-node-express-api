const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query;

    const contacts = await ContactRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    // Obter um registro
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      response.status(404).json({ error: 'User not found' });
      return;
    }

    response.json(contact);
  }

  async store(request, response) {
    // Criar um registro
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name || !email) {
      return response.status(400).json({ error: 'Require fields can not be empty, name and e-mail ' });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactRepository.create({
      name, email, phone, category_id,
    });

    return response.json(contact);
  }

  async update(request, response) {
    // Editar novo registro
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name || !email) {
      return response.status(400).json({ error: 'Require fields can not be empty, name and e-mail ' });
    }

    const contactIdExists = await ContactRepository.findById(id);

    if (!contactIdExists) {
      // 404: not found
      return response.status(404).json({ error: 'User not found' });
    }

    const contactEmailExists = await ContactRepository.findByEmail(email);

    if (contactEmailExists && contactEmailExists.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactRepository.update(id, {
      name, email, phone, category_id,
    });

    return response.json(contact);
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;

    await ContactRepository.delete(id);
    // 204: no content
    response.sendStatus(204);
  }
}

// Singleton
// Ele ta exportando o novo sempre vai ta importando uma class nova que foi gerada em memoria.
module.exports = new ContactController();
