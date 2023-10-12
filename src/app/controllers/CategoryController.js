const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;

    const categories = await CategoryRepository.findAll(orderBy);
    response.json(categories);
  }

  async show(request, response) {
    // Obter um registro
    const { id } = request.params;
    const category = await CategoryRepository.findById(id);

    if (!category) {
      response.status(404).json({ error: 'Category not found' });
      return;
    }

    response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoryRepository.create({ name });

    return response.json(category);
  }

  async update(request, response) {
    // Editar novo registro
    const { id } = request.params;
    const {
      name,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Require fields, name can not be empty ' });
    }

    const categoryExists = await CategoryRepository.findById(id);

    if (!categoryExists) {
      // 404: not found
      return response.status(404).json({ error: 'Category not found' });
    }

    const contact = await CategoryRepository.update(id, {
      name,
    });

    return response.json(contact);
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;

    await CategoryRepository.delete(id);
    // 204: no content
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
