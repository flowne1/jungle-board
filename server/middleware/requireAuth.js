const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function requireAuth(req, res, next) {
  try {
    // Read token off cookies
    const token = req.cookies.Authorization; // We named our cookie to 'Authorization', and jwt in it

    // Decode the token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Check expiration
    if (Date.now() > decoded.exp) {
      return res.status(401).send("Cookie Expired!");
    }

    // Find user using decoded sub
    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(401).send("user not found");
    }

    // Attach user to request
    req.user = user;

    // Continue on
    next();
  } catch (err) {
    return res.status(401).send("error occured in requireAuth");
  }
}

module.exports = requireAuth;
