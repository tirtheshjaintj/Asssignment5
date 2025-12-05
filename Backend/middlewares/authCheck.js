const { AppError } = require("../helpers/error.helper.js");
const { getUser } = require("../helpers/jwt.helper");
const UserModel = require('../models/user.model.js');

async function restrictLogIn(req, res, next) {
  try {
    // Correct way to access authorization header (case-insensitive)
    let token = req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
      token = token.substring(7); // Remove 'Bearer ' prefix
    }
    //console.log('Authorization token:', token);

    // Get user from token
    const user = getUser(token);
    // Check if user exists, if not respond with 401 Unauthorized
    if (!user) {
      return res.status(401).json({ status: false, message: "Invalid Login Details" });
    }

    // Attach user object to the request
    req.user = user;

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    // Log error for debugging purposes
    console.error('Error in restrictLogIn:', error);

    // Respond with 401 Unauthorized if an error occurs
    return res.status(401).json({ status: false, message: "Wrong Details" });
  }
}

const authcheckAdmin = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;

  // Check Bearer token
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.substring(7);
  }

  // Check cookie token
  //   if (req.cookies && req.cookies.authToken) {
  //     token = req.cookies.authToken;
  //     //console.log(token);
  //   }

  if (!token) throw new AppError("Token not found", 401);

  //console.log({ adad: token });
  const user = getUser(token);
  if (!user) throw new AppError("Not Authorized", 401);

  const verified_user = await UserModel.findOne({
    _id: user._id,
    isActive: true,
    isAdmin: true,
  });
  //console.log(verified_user);
  if (!verified_user) throw new AppError("Not Authorized", 401);

  verified_user.password = "HIDDEN"; // Hide password
  req.user = verified_user;

  next();
};

module.exports = { restrictLogIn, authcheckAdmin };
