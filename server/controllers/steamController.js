const axios = require("axios");
const User = require("../models/user");
const apiKey = process.env.STEAM_WEB_API_KEY;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

async function getUserFromToken(req) {
  const token = req.cookies.Authorization; // 쿠키에서 토큰 추출
  if (!token) {
    return null; // 토큰이 없는 경우
  }

  try {
    // Read token off cookies
    const token = req.cookies.Authorization; // We named our cookie to 'Authorization', and jwt in it
    // Decode the token
    const decoded = jwt.verify(token, process.env.SECRET);
    // Find user using decoded sub
    const user = await User.findById(decoded.sub);
    // Return 'User'
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getOwnedGames(req, res) {
  const user = await getUserFromToken(req);

  const requestData = {
    steamid: user.steamId,
    include_appinfo: true,
    include_played_free_games: false,
  };

  try {
    const steamRes = await axios.get(
      "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/",
      {
        params: {
          key: apiKey,
          input_json: JSON.stringify(requestData),
        },
      }
    );

    res.json(steamRes.data.response);
  } catch (error) {
    res.status(500).send("Failed to retrieve owned games: " + error.message);
  }
}

async function getAppDetails(req, res) {
  // Get the id off the url
  const appid = req.params.appid;

  try {
    const appRes = await axios.get(
      `https://store.steampowered.com/api/appdetails?l=english&appids=${appid}`
    );

    res.json(appRes.data[appid]);
  } catch (error) {
    res.status(500).send("Failed to retrieve app details: " + error.message);
  }
}

module.exports = {
  getUserFromToken,
  getOwnedGames,
  getAppDetails,
};
