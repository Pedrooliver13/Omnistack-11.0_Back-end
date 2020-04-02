const express = require("express");
const routes = express.Router();

const ongsControllers = require("./src/app/controllers/ongs");
const incidentsControllers = require("./src/app/controllers/incidents");
const profileControllers = require("./src/app/controllers/profileControllers");
const sessionControllers = require("./src/app/controllers/sessionControllers");

routes.post("/sessions", sessionControllers.create);

routes.get("/", ongsControllers.index);
routes.post("/ongs", ongsControllers.post);

routes.get("/profile", profileControllers.index);

routes.get("/incidents", incidentsControllers.index);
routes.post("/incidents/new", incidentsControllers.post);
routes.delete("/incidents/:id", incidentsControllers.delete);

module.exports = routes;
