import { tasksConnect } from "./db.js";
import { ObjectId } from "mongodb";

export async function getAllTasks(Task) {
  // const { mongoClient, tasksCollection } = await tasksConnect();

  // const cursor = tasksCollection.find();
  // const result = await cursor.toArray();
  // mongoClient.close();
  const result = await Task.find({});
  return result;
}

export async function getTaskById(Task, id) {
  /* const dbId = ObjectId(id);
  const { mongoClient, tasksCollection } = await tasksConnect();
  const result = await tasksCollection.findOne({ _id: dbId });
  mongoClient.close(); */
  // const result = await Task.find({ _id: id });
  const result = await Task.findById(id);
  return result;
}

export async function insertTask(Task, task) {
  /* const { mongoClient, tasksCollection } = await tasksConnect();
  const result = await tasksCollection.insertOne(task);
  mongoClient.close(); */
  task.isCompleted = task.isCompleted ? task.isCompleted : false;
  const newTask = new Task(task);
  newTask.algo();
  const result = await newTask.save();
  return result;
}

export async function updateTask(Task, id, partialTask) {
  /* const dbId = ObjectId(id);
  const { mongoClient, tasksCollection } = await tasksConnect();
  const result = await tasksCollection.updateOne(
    { _id: dbId },
    { $set: { ...partialTask } }
  );
  mongoClient.close(); */
  const result = await Task.findByIdAndUpdate(id, partialTask, { new: true });
  return result;
}

export async function deleteTask(Task, id) {
  /* const dbId = ObjectId(id);
  const { mongoClient, tasksCollection } = await tasksConnect();
  const result = await tasksCollection.deleteOne({ _id: dbId });
  mongoClient.close(); */
  const result = await Task.findByIdAndDelete(id);
  return result;
}

console.log("Módulo cargado");
