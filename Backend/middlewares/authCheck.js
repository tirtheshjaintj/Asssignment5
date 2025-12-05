const { AppError } = require("../helpers/error.helper.js");
const { getUser } = require("../helpers/jwt.helper");
const UserModel = require('../models/user.model.js');

async function restrictLogIn(req, res, next) {
  try {
    let token = req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
      token = token.substring(7);
    }

    const user = getUser(token);
    if (!user) {
      return res.status(401).json({ status: false, message: "Invalid Login Details" });
    }
    req.user = user;

    next();
  } catch (error) {
    console.error('Error in restrictLogIn:', error);
    return res.status(401).json({ status: false, message: "Wrong Details" });
  }
}

const authcheckAdmin = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;

  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.substring(7);
  }

  if (!token) throw new AppError("Token not found", 401);

  const user = getUser(token);
  if (!user) throw new AppError("Not Authorized", 401);

  const verified_user = await UserModel.findOne({
    _id: user._id,
    isActive: true,
    isAdmin: true,
  });

  if (!verified_user) throw new AppError("Not Authorized", 401);

  verified_user.password = "HIDDEN";
  req.user = verified_user;

  next();
};

module.exports = { restrictLogIn, authcheckAdmin };
