// const router = require("express").Router();

var express = require("express");
var router = express.Router();

const {
  getAllTasks,
  addTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.js");

router.get("/", getAllTasks);
router.post("/", addTask);
router.get("/:id", getTaskById);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
