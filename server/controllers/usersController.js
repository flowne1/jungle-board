const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  try {
    // Get data from client
    const {
      email: userEmail,
      password: userPassword,
      steamId64: userSteamId,
    } = req.body;

    // Create hashed password
    const hashedUserPassword = await bcrypt.hash(userPassword, saltRounds);

    // Create user with the data
    await User.create({
      email: userEmail,
      password: hashedUserPassword,
      steamId: userSteamId,
    });

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
      const exp = Date.now() + 1000 * 60 * 60 * 24; // 24 Hours (in ms unit)
      const token = jwt.sign({ sub: user._id, exp: exp }, process.env.SECRET);

      // Set the cookie and responde with it
      res
        .cookie("Authorization", token, {
          expires: new Date(exp),
          httpOnly: true,
          sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
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
    res
      .clearCookie("Authorization", { secure: true, sameSite: "none" })
      .status(200)
      .send("Cookie destroyed");
  } catch (err) {
    res.sendStatus(500);
  }
}

async function checkAuth(req, res) {
  try {
    // 쿠키에서 특정 쿠키(예: 'Authorization') 확인
    const token = req.cookies["Authorization"];

    // 쿠키가 없으면 401 에러 발생
    if (!token) {
      console.log("no token!!");
      return res.status(401).send("No token provided");
    }

    console.log(req.user);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};
