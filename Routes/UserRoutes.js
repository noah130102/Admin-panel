const userRoutes = require("express").Router();
const path = require("path");
const multer = require("multer");
const UserController = require("../Controllers/UserController");
const { authorizeUser } = require("../Middlewares/Authorization");
const upload = multer({ dest: "./Public/Uploads" });

userRoutes.post("/register", upload.single("file"), UserController.register);
userRoutes.post("/login", UserController.login);
userRoutes.get("/profile", authorizeUser, UserController.profile);
userRoutes.get("/getUsers", UserController.getUsers);
userRoutes.post(
  "/addByAdmin",
  upload.single("file"),
  UserController.adminCreate
);
userRoutes.delete("/deleteUser/:id", UserController.deleteUser);
userRoutes.get("/getOneUser/:id", UserController.getOneUser);
userRoutes.put(
  "/updateUser/:id",
  upload.single("file"),
  UserController.updateUser
);

module.exports = userRoutes;
