const crypto = require("crypto"); //crypto = cria um id 'cryptografado'; 
const connection = require("../../database/connection");//conexão com o banco de dados;

module.exports = {
  async index(req, res){
    const ongs = await connection("ongs").select("*");
    
    return res.json(ongs);
  },
  async post(req, res) {
    const { name, email, whatsapp, city, uf } = req.body; // saber o que estou envinando;

    const id = crypto.randomBytes(4).toString("HEX"); //gerando um id aleatorio;

    await connection("ongs").insert({
      // funciona como o insert into; (criação);
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return res.json();
  }
};
