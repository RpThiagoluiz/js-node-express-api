const db = require('../../database');

class ContactRepository {
  // SELECT msm esquema do returning
  // SELECT name
  // SELECT name, id
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    // Para nao da ambiguidade vc usa meio que um obj no js pro banco entender
    // sempre referencia a tabela, e sempre deve ser utilizado quando se da join em tabelas

    /*
    *@SQL
    A tabela da esquerda sempre é a from
    A tabela da direita sempre a do JOIN
    * JOIN puro é um INNER JOIN
    * INNER JOIN -> Somente o que tem relação com a ação
    * LEFT JOIN -> Ele retornar os que estão na interseção e os que não estão. Sempre da esquerda
    * RIGHT JOIN -> Msm coisa só que o da direita
    * FULL JOIN -> Retornar tudo independente se tem relacionamento e não
    */
    const rows = await db.query(`SELECT contacts.*, categories.name AS category_name FROM contacts LEFT JOIN categories ON categories.id = contacts.category_id ORDER BY contacts.name ${direction}`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT contacts.*, categories.name AS category_name FROM contacts LEFT JOIN categories ON categories.id = contacts.category_id WHERE contacts.id = $1', [id]);

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);

    return row;
  }

  async create({
    name, email, phone, category_id,
  }) {
    // SQL injectin,
    // se vc pega o dado sem tratar isso deixar o banco de dados
    // eslint-disable-next-line max-len
    ///  INSERT INTO contacts(name, email, phone, category_id) VALUES('${name}', '${email}', '${phone}', '${category_id}')`);
    // vulneravel a ataques que s'ao queries podendo retornar alguns dados do banco
    // ou apagar dados
    // Por isso usamos o $<numero>

    // Returning -> ele pode retornar um valor, mais ou todos
    // RETURNING name
    // RETURNING name, email

    const [row] = await db.query(`
   INSERT INTO contacts(name, email, phone, category_id) VALUES($1, $2, $3, $4) RETURNING *`, [name, email, phone, category_id]);

    return row;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query('UPDATE contacts SET name = $1, email = $2, phone = $3, category_id = $4 WHERE id = $5 RETURNING *', [name, email, phone, category_id, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM contacts WHERE id = $1 ', [id]);

    return deleteOp;
  }
}

module.exports = new ContactRepository();
