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

const Task = mongoose.model(collection, taskSchema);
module.exports = Task;
