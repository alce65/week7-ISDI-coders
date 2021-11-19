const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoConnect = require("./config/db.js");

const tasksRouter = require("./routes/tasks.router.js");
const usersRouter = require("./routes/users.router.js");

const app = express();
mongoConnect();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);

module.exports = app;
