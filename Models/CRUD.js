const mongoose = require("mongoose");

const CRUDSchema = new mongoose.Schema({
  tasks: { type: String, required: true },
  priority: { type: String, required: true },
  status: { type: String, required: true },
});

const crudModel = mongoose.model("Crud", CRUDSchema);

module.exports = crudModel;
