import { booksConnect } from "./db.js";
import { ObjectId } from "mongodb";

export async function getAllBooks() {
  const { mongoClient, booksCollection } = await booksConnect();
  const cursor = booksCollection.find();
  const result = await cursor.toArray();
  mongoClient.close();
  return result;
}

export async function getBookById(id) {
  const dbId = ObjectId(id);
  const { mongoClient, booksCollection } = await booksConnect();
  const result = await booksCollection.findOne({ _id: dbId });
  mongoClient.close();
  return result;
}

export async function insertBook(book) {
  const { mongoClient, booksCollection } = await booksConnect();
  const result = await booksCollection.insertOne(book);
  mongoClient.close();
  return result;
}

export async function updateBook(id, partialBook) {
  const dbId = ObjectId(id);
  const { mongoClient, booksCollection } = await booksConnect();
  const result = await booksCollection.updateOne(
    { _id: dbId },
    { $set: { ...partialBook } }
  );
  mongoClient.close();
  return result;
}

export async function deleteBook(id) {
  const dbId = ObjectId(id);
  const { mongoClient, booksCollection } = await booksConnect();
  const result = await booksCollection.deleteOne({ _id: dbId });
  mongoClient.close();
  return result;
}
