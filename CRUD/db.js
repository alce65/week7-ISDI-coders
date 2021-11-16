// require("dotenv").config();
import * as dotenv from "dotenv";
dotenv.config();
// const MongoClient = require('mongodb')
import { MongoClient } from "mongodb";
import dataBooks from "./books.json";

export async function mongoConnect() {
  const user = process.env.DBUSER;
  const passwd = process.env.DBPASSWD;
  const databaseName = process.env.DBNAME;

  const uri = `mongodb+srv://${user}:${passwd}@cluster0.dj9ya.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

  const mongoClient = new MongoClient(uri);
  const mongoConnect = await mongoClient.connect();
  const dbCoders = mongoConnect.db();
  return { mongoClient, dbCoders };
}

export async function booksConnect() {
  const collection = process.env.BOOKS_COLLECTION;
  const { mongoClient, dbCoders } = await mongoConnect();
  const booksCollection = dbCoders.collection(collection);

  return { mongoClient, booksCollection };
}

export async function booksPopulate() {
  const collection = process.env.BOOKS_COLLECTION;
  const { mongoClient, dbCoders } = await mongoConnect();
  const list = await dbCoders.listCollections({ name: collection }).toArray();
  if (list.length) {
    await dbCoders.dropCollection(collection);
  }
  const bookCollection = dbCoders.collection(collection);
  const result = await bookCollection.insertMany(dataBooks.books);
  mongoClient.close();
  return result;
}
