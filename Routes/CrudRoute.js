const crudRoute = require("express").Router();
const CrudController = require("../Controllers/CrudController.js");

crudRoute.post("/add", CrudController.addTask);
crudRoute.get("/get", CrudController.getItems);
crudRoute.put("/update", CrudController.updateItems);
crudRoute.delete("/delete/:id", CrudController.deleteTask);

module.exports = crudRoute;
