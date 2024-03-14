const ejsRoutes = require("express").Router();

ejsRoutes.get("/", (req, res) => {
  res.render("home");
});
ejsRoutes.get("/login", (req, res) => {
  res.render("login");
});
ejsRoutes.get("/register", (req, res) => {
  res.render("register");
});

ejsRoutes.get("/admin", (req, res) => {
  res.render("admin");
});

ejsRoutes.get("/user", (req, res) => {
  res.render("user");
});
ejsRoutes.get("/navbar", (req, res) => {
  res.render("navbar");
});
ejsRoutes.get("/sidebar", (req, res) => {
  res.render("sidebar");
});
ejsRoutes.get("/adminportal", (req, res) => {
  res.render("adminportal");
});
ejsRoutes.get("/addRole", (req, res) => {
  res.render("addRole");
});
ejsRoutes.get("/updateRole", (req, res) => {
  res.render("updateRole");
});
ejsRoutes.get("/addUserByAdmin", (req, res) => {
  res.render("addUserByAdmin");
});

ejsRoutes.get("/listUserDetails", (req, res) => {
  res.render("listUserDetails");
});

ejsRoutes.get("/updateUser", (req, res) => {
  res.render("updateUser");
});

module.exports = ejsRoutes;
