const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

//Used for later routes such as getting messages, etc
//If user is logged in, there will be an authToken cookie
const auth = async (req, res, next) => {
  if (!req.cookies.authToken) {
    return res.status(401).send({ errorMessage: "Authentication error!" });
  }
  try {
    const token = req.cookies.authToken;
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userID = decodedToken._id;
    const user = await User.findOne({ _id: userID });
    req.user = user;
    console.log("Authenticated!");
    next();
  } catch (e) {
    return res.status(401).send({ errorMessage: "Authentication error!" });
  }
};

module.exports = auth;
