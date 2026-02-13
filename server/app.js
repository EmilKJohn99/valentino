const express = require("express");
const cors = require("cors");

const movieRoutes = require("./routes/movieRoutes");
const quizRoutes = require("./routes/quizRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
