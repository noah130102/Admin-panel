const jwt = require("jsonwebtoken");
const secret = "kd83";

const authRole = (req, res, next) => {
  const { token } = req.headers;

  if (token) {
    jwt.verify(token, secret, (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log("Token Verified!!");
        req.user = res.role;
        if (req.user === "admin") {
          next();
        } else {
          console.log("You are a user you can't access Admin portal!!");
        }
      }
    });
  } else {
    console.log("Not Authorised!!");
  }
};

module.exports = { authRole };
