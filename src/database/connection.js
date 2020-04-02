const knex = require("knex");
const configuration = require("../../knexfile"); // aqui estão as conexão com o banco de dados

const connection = knex(configuration.development); // usando conexão de desenvolvedor;

module.exports = connection;
