const Users = require("../models/userModels");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("🚀 ~ file: auth.js:7 ~ auth ~ token", token)

    if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

    const decoded = jwt.verify(token.replace(/['"]+/g, ""), process.env.ACCESS_TOKEN_SECRET);
    // console.log("🚀 ~ file: auth.js:12 ~ auth ~ decoded", decoded)
    if (!decoded)
      return res.status(400).json({ msg: "Invalid Authentication." });

    const user = await Users.findOne({ _id: decoded.id });

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;
