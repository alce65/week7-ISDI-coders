// require("dotenv").config();
import * as dotenv from "dotenv";
dotenv.config();
// const MongoClient = require('mongodb')
// import { MongoClient } from "mongodb";
import mongoose from "mongoose";
// const mongoose = require("mongoose");

export async function mongoConnect() {
  const user = process.env.DBUSER;
  const passwd = process.env.DBPASSWD;
  const databaseName = process.env.DBNAME;

  const uri = `mongodb+srv://${user}:${passwd}@cluster0.dj9ya.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

  const mongooseConnect = await mongoose.connect(uri);
  return;

  /* const mongoClient = new MongoClient(uri);
  const mongoConnect = await mongoClient.connect();
  const dbCoders = mongoConnect.db();
  return { mongoClient, dbCoders }; */
}

export async function tasksConnect() {
  const collection = process.env.TASK_COLLECTION;
  await mongoConnect();
  // const { mongoClient, dbCoders } = await mongoConnect();
  // const tasksCollection = dbCoders.collection(collection);

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
  return Task;

  //return { mongoClient, tasksCollection };
}
