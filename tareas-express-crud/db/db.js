// require("dotenv").config();
import * as dotenv from "dotenv";
dotenv.config();
// const MongoClient = require('mongodb')
import { MongoClient } from "mongodb";

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

export async function tasksConnect() {
  const collection = process.env.TASK_COLLECTION;
  const { mongoClient, dbCoders } = await mongoConnect();
  const tasksCollection = dbCoders.collection(collection);

  return { mongoClient, tasksCollection };
}
