const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  try {
    // Get data from client
    const { email: userEmail, password: userPassword } = req.body;

    // Create hashed password
    const hashedUserPassword = await bcrypt.hash(userPassword, saltRounds);

    // Create user with the data
    await User.create({ email: userEmail, password: hashedUserPassword });

    // Send success response
    res.sendStatus(200);
  } catch (err) {
    // Error handling
    console.error(err);
    res.status(500).send("An error occurred during the signup process.");
  }
}

async function login(req, res) {
  try {
    // Get data from client
    const { email: userEmail, password: userPassword } = req.body;

    // Get user that matches user email, if any
    const user = await User.findOne({ email: userEmail }).exec();
    if (!user) {
      return res.status(401).send("User not found");
    }
    const dbUserPassword = user.password;

    // Load hash from your password DB.
    const passwordMatched = await bcrypt.compare(userPassword, dbUserPassword);
    if (passwordMatched) {
      // Create jwt token
      const exp = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 DAYS(in ms unit)
      const token = jwt.sign({ sub: user._id, exp: exp }, process.env.SECRET);

      // Set the cookie and responde with it
      res
        .cookie("Authorization", token, {
          expires: new Date(exp),
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
        .send("Login Successful");
    } else {
      res.status(401).send("Password incorrect");
    }
  } catch (err) {
    // Error handling
    console.error(err);
    res.status(500).send("An error occurred during the signup process.");
  }
}

function logout(req, res) {
  // ??
}

function checkAuth(req, res) {
  res.sendStatus(200);
}

module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};
