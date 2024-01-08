// Load env varaibles
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const Note = require("./models/note");
const notesController = require("./controllers/notesController");
const usersController = require("./controllers/usersController");
const steamController = require("./controllers/steamController");
const commentController = require("./controllers/commentController");
const cookieParser = require("cookie-parser");
const requireAuth = require("./middleware/requireAuth");

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Connect to database
connectToDb();

// Routing
app.get("/", (req, res) => {
  res.json({ main: "page" });
});

// Auth - related APIs
app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);
app.get("/check-auth", requireAuth, usersController.checkAuth);

// Note - related APIs
app.get("/notes", requireAuth, notesController.fetchNotes);
app.get("/notes/:id", requireAuth, notesController.fetchNote);
app.post("/notes", requireAuth, notesController.createNote);
app.put("/notes/:id", requireAuth, notesController.updateNote);
app.delete("/notes/:id", requireAuth, notesController.deleteNote);

// Comment - related APIs
app.post(
  "/notes/:noteId/comments",
  requireAuth,
  commentController.createComment
);
app.get(
  "/notes/:noteId/comments",
  requireAuth,
  commentController.fetchCommentAll
);
app.delete(
  "/notes/:noteId/comments/delete",
  requireAuth,
  commentController.deleteComment
);

// Steam - related APIs
app.get("/steam/owned-games", requireAuth, steamController.getOwnedGames);
app.get(
  "/steam/get-user-from-token",
  requireAuth,
  steamController.getUserFromToken
);
app.get(
  "/steam/app-details/:appid",
  requireAuth,
  steamController.getAppDetails
);

// Start our server
app.listen(process.env.PORT);
