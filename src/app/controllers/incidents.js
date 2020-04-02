const connection = require("../../database/connection"); //usando banco de dados sqlite3(para instalar use npm install sqlite3);

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.params;

    const [count] = await connection("incidents").count(); //[count] ou count[0] daria o mesmo resultado;

    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ongs_id") // relacionando as tabelas
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ]); // como fizemos o relacionamento das tables , precisamos dizer qual colunas nos queremos;

    res.header("X-Total-Count", count["count(*)"]); // saber o total de registros;

    return res.json(incidents);
  },
  async post(req, res) {
    const {title, description, value} = req.body;
    const ong_id = req.headers.authorization; 

    const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id
    })

    return res.json({id})
  },
  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incidents = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (incidents.ong_id != ong_id) {
      return res.status(401).json({ error: `Error` });
    }

    await connection("incidents")
      .where("id", id)
      .delete();

    return res.status(204).send();
  }
};
