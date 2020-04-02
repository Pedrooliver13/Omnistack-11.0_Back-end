const connection = require("../../database/connection");

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    // quero que me retorne apenas o nome;
    const ong = await connection("ongs")
      .where('id', id)
      .select('name')
      .first();

    if(!ong){
      return res.status(400).json({error: 'DONT have ongs'})
    }

    return res.json(ong)
  }
};
