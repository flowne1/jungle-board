const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  // Read token off cookies
  const token = req.cookies.Authorization; // We named our cookie to 'Authorization', and jwt in it

  // Verify a token symmetric
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    console.log(decoded.foo); // bar
  });

  // Find user using decoded sub

  // Attach user to request

  // Continue on
  next();
}

module.exports = requireAuth;
