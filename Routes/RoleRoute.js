const roleRoute = require("express").Router();
const RoleController = require("../Controllers/RoleController");

roleRoute.post("/addRole", RoleController.addRole);
roleRoute.get("/getRoles", RoleController.getRoles);
roleRoute.delete("/deleteRole/:id", RoleController.deleteRole);
roleRoute.put("/updateRole/:id", RoleController.updateRole);
roleRoute.get("/permissions/:user", RoleController.getPermissions);
roleRoute.get("/getRoleDetails/:id", RoleController.getRoleDetails);

module.exports = roleRoute;
