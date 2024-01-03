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
      const exp = Date.now() + 1000 * 60 * 5; // 5 Minutes (in ms unit)
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
    res.status(500).send("An error occurred during the login process.");
  }
}

function logout(req, res) {
  try {
    // Delete cookie
    res.clearCookie("Authorization").status(200).send("Cookie destroyed");
  } catch (err) {
    res.sendStatus(500);
  }
}

function checkAuth(req, res) {
  try {
    console.log(req.user);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}

module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};
