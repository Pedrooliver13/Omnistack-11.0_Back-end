const express = require("express");
const cors = require('cors');
const routes = require("../router");

const app = express();


app.use(cors());
app.use(express.json()); // react só recebe em json, para não atualizar a pág todo momento , apenas as infos;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));//aceita enviar formulários
app.use(routes);

app.listen(1313, () => {
  console.log("Server is Running");
});
