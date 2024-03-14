const port = 4000;
const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// middlewares
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use("/Public", express.static(__dirname + "/Public"));

// Routes
const crudRoute = require("./Routes/CrudRoute");
const userRoutes = require("./Routes/UserRoutes");
const { authorizeUser } = require("./Middlewares/Authorization");
const { authRole } = require("./Middlewares/AuthRole");
const roleRoute = require("./Routes/RoleRoute");
const ejsRoutes = require("./Routes/EJSRoute");

mongoose.connect("mongodb://localhost:27017/cssoft", {});
mongoose.connection.on("connected", () => {
  console.log("MongoDb is successfully Connected!!");
});
mongoose.connection.on("error", (err) => {
  console.log(`mongoDb not connected due to error ${err}`);
});

// CRUD route
app.use("", crudRoute);

// User Route
app.use("", userRoutes);

// Role Route
app.use("", roleRoute);

// EJS Route
app.use("", ejsRoutes);

app.set("view engine", "ejs");

// Port
app.listen(port, () => {
  console.log(`working on port no ${port}`);
});
