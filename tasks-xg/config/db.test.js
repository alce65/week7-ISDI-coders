require("dotenv").config();
const mongoConnect = require("./db.js");
const mongoose = require("mongoose");

describe("given a connection with MongoDB", () => {
  afterAll(() => {
    mongoose.disconnect();
  });

  test("then should exist our DB ", async () => {
    process.env.DBUSER = "admin";
    const connect = await mongoConnect();
    expect(connect).toBeTruthy();
    expect(connect.connections).toBeTruthy();
    const Task = require("../models/task.model.js");
    expect(Task.collection.modelName).toBe("Task");
  });
});
