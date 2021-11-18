import { tasksConnect } from "./db.js";
import { ObjectId } from "mongodb";

export async function getAllBooks(Task) {
  // const { mongoClient, tasksCollection } = await tasksConnect();

  // const cursor = tasksCollection.find();
  // const result = await cursor.toArray();
  // mongoClient.close();
  const result = await Task.find({});
  return result;
}

export async function getBookById(Task, id) {
  const dbId = ObjectId(id);
  const { mongoClient, tasksCollection } = await tasksConnect();
  const result = await tasksCollection.findOne({ _id: dbId });
  mongoClient.close();
  return result;
}

export async function insertBook(Task, book) {
  const { mongoClient, tasksCollection } = await tasksConnect();
  const result = await tasksCollection.insertOne(book);
  mongoClient.close();
  return result;
}

export async function updateBook(Task, id, partialBook) {
  const dbId = ObjectId(id);
  const { mongoClient, tasksCollection } = await tasksConnect();
  const result = await tasksCollection.updateOne(
    { _id: dbId },
    { $set: { ...partialBook } }
  );
  mongoClient.close();
  return result;
}

export async function deleteBook(Task, id) {
  const dbId = ObjectId(id);
  const { mongoClient, tasksCollection } = await tasksConnect();
  const result = await tasksCollection.deleteOne({ _id: dbId });
  mongoClient.close();
  return result;
}

console.log("Módulo cargado");
