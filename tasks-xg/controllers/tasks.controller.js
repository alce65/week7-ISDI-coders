const Task = require("../models/task.model.js");

async function getAllTasks(req, res, next) {
  try {
    const result = await Task.find({});
    res.send(result);
  } catch (err) {
    next(err);
  }
}
function addTask(req, res, next) {
  const task = req.body;
  if (!task.title) {
    next(new Error());
  }
  task.isCompleted = task.isCompleted ? task.isCompleted : false;
  const newTask = new Task(task);
  newTask.algo();
  newTask
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
}

function getTaskById(req, res, next) {
  Task.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => next(err));
}
function updateTask(req, res, next) {
  Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedTask) => {
      res.json(updatedTask);
    })
    .catch((err) => next(err));
}

function deleteTask(req, res, next) {
  Task.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(202).json({ deletedId: req.params.id });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  getAllTasks,
  addTask,
  getTaskById,
  updateTask,
  deleteTask,
};
