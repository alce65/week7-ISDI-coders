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
  const db = mongoConnect.db();
  return { mongoClient, db };
}
