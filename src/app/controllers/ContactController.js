const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const contacts = await ContactRepository.findAll();
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

  store() {
    // Criar novo registro
  }

  update() {
    // Editar novo registro
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      // 404: not found
      response.status(404).json({ error: 'User not found' });
      return;
    }

    await ContactRepository.delete(id);
    // 204: no content
    response.sendStatus(204);
  }
}

// Singleton
// Ele ta exportando o novo sempre vai ta importando uma class nova que foi gerada em memoria.
module.exports = new ContactController();
