const roleModel = require("../Models/Roles");
const userModel = require("../Models/User");

const addRole = async (req, res) => {
  const { role, active, permissions } = req.body;
  try {
    const doc = await roleModel.create({ role, active, permissions });

    res.json({ doc });
  } catch (error) {
    res.json({ "error is": error });
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const roleDoc = await roleModel.findById(id);
    const roleName = roleDoc.role;

    const result = await userModel.deleteMany({ role: roleName });
    const del = await roleModel.findByIdAndDelete(id);

   
    if (!del || !result) return res.status(401).send("No");

    res
      .status(200)
      .json({ message: "Role and users with same role Deleted Succesfully" });
  } catch (error) {
    res.json({ "error is": error });
  }
};

const getRoles = async (req, res) => {
  try {
    const data = await roleModel.find();
    res.json(data);
  } catch (error) {
    res.json({ "error is": error });
  }
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { role, active, permissions } = req.body;

  try {
    const getro = await roleModel.findById(id);
    const doc = await roleModel.updateOne(
      { _id: id },
      {
        role: role ? role : getro.role,
        active: active ? active : getro.active,
        permissions,
      }
    );
    if (doc) {
      res.json({ message: "Role Updated!!" });
    }
  } catch (error) {
    res.json({ "error is": error });
  }
};

const getPermissions = async (req, res) => {
  const { user } = req.params;

  try {
    const doc = await roleModel.findOne({ role: user }, "permissions");
    if (res) {
      res.json({ permissions: doc.permissions });
    } else {
      res.json("Cant Find role in Db!!");
    }
  } catch (error) {
    console.log(error);
    res.json({ "error is": error });
  }
};
const getRoleDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const det = await roleModel.findById(id);

    res.json({ data: det });
  } catch (error) {
    res.json({ "error is": error });
  }
};

module.exports = {
  addRole,
  deleteRole,
  getRoles,
  updateRole,
  getPermissions,
  getRoleDetails,
};
