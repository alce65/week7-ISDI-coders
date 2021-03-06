require("dotenv").config();
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  responsible: String,
  isCompleted: Boolean,
});
taskSchema.methods.algo = function () {};

taskSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
