# npm install knex;

# npm knex init 
// cria o arquivo chamado knexfile.js

# npm install sqlite3 
// banco de dados usado;

# nele você configura tudo, como a ligação do banco de dados com o migrations(onde vc faz as tabelas);
 
como configurar ? assim

 development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

# npm knex migrate:make nomeDaTabela
// vai criar um arquivo migrate ,para já pode montar sua tabela

# npx knex migrate:latest 
// cria o banco de dados(tabelas);

# npx knex migrate:rowback 
// Desfaz o que foi criado; 

# npx knex migrate:status 
//ele me diz quais foram executados; 

# EXEMPLO DE COMO CRIAR TABELA NO MIGRATE;

exports.up = function(knex) { // aqui voce cria
  return knex.schema.createTable("ongs", function(table) {
    table.string("id").primary(); //id que da minha escolha;
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.string("city").notNullable();
    table.string("uf", 2).notNullable();
  });
};

exports.down = function(knex) { // caso algo de errado , posso mandar ele deletar essa tabela;
  return knex.schema.dropTable("ongs");
};

# AGORA FALTA CONFIGURAR O CONNECTION;
// ele vai ser responsável por fazer a conexão com o banco de dados

como configurar ?
const knex = require("knex");
const configuration = require("../../knexfile"); // aqui estão as conexão com o banco de dados

const connection = knex(configuration.development); // usando conexão de desenvolvedor;

module.exports = connection;


# UM EXEMPLO DE COMO PUXAR AS INFOS COM O CONNECTION;

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


# PARA FAZER CONEXÃO COM O FRONT-END 

# npm install cors

no index.js(servidor);

const cors = require('cors');
const app = express();

app.use(cors());