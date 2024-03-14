const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = "kd83";
const saltRounds = 10;
const userModel = require("../Models/User");
const fs = require("fs");
const roleModel = require("../Models/Roles");

const register = async (req, res) => {
  const { username, email, password, gender, age } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);

  if (req.file && req.file.originalname) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;

    fs.renameSync(path, newPath);

    try {
      const userdoc = await userModel.create({
        username,
        email,
        password: bcrypt.hashSync(password, salt),
        gender,
        age,
        photo: newPath,
      });

      res.json({ userInfo: userdoc });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userIf = await userModel.findOne({ username });

    if (!userIf) {
      return res.status(400).json("Wrong Username !!");
    }

    const passwordMatching = bcrypt.compareSync(password, userIf.password);

    if (passwordMatching === true) {
      const roleDoc = await roleModel.find({ role: userIf.role });
      console.log(roleDoc[0].active);
      if (roleDoc[0].active == 1) {
        jwt.sign(
          {
            id: userIf._id,
            role: userIf.role,
            username: username,
          },
          secret,
          {},
          (err, token) => {
            if (err) {
              return res.status(500).json({ error: "Failed to create token" });
            }
            return res.json({
              token: token,
              username: username,
            });
          }
        );
      } else {
        res.status(401).json({ message: "User is no longer active!!" });
      }
    } else {
      res.status(401).json({ message: "Wrong Password" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const profile = async (req, res) => {
  const userData = req.user;
  if (userData) {
    res.json({ role: userData });
  } else {
    res.json({ role: "user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const adminCreate = async (req, res) => {
  const { username, email, password, gender, age, role } = req.body;

  if (req.file && req.file.originalname) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;

    fs.renameSync(path, newPath);
    const salt = bcrypt.genSaltSync(saltRounds);

    try {
      const userdoc = await userModel.create({
        username,
        email,
        password: bcrypt.hashSync(password, salt),
        gender,
        age,
        role,
        photo: newPath,
      });

      res.json({ userInfo: userdoc });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const del = await userModel.findByIdAndDelete(id);
    res.json("Deleted Successfully");
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, gender, age, role } = req.body;
  let newPath = null;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const userDoc = await userModel.findById(id);
  try {
    const doc = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        username,
        email,
        gender,
        age,
        role,
        photo: newPath ? newPath : userDoc.photo,
      }
    );

    if (doc) {
      res.json("Updated successfully!");
    } else {
      res.status(400).json("No such User exists.");
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
module.exports = {
  register,
  login,
  profile,
  getUsers,
  adminCreate,
  deleteUser,
  getOneUser,
  updateUser,
};
