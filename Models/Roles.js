const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role: { type: String, required: true },
  active: { type: Number, required: true, default: 1 },
  permissions: { type: [String], default: [], required: true },
});

const roleModel = mongoose.model("role", roleSchema);

module.exports = roleModel;
