const request = require("supertest");
const app = require("../app.js");
const mongoose = require("mongoose");
const Task = require("../models/task.model.js");
const data = require("../models/task.data.json");

describe("Given the test database with a initial state", () => {
  beforeEach(async () => {
    await Task.deleteMany({});
    await Task.insertMany(data);
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  describe("When the request is GET /tasks", function () {
    it("responds with json", async function () {
      const response = await request(app).get("/tasks");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("DELETE /tasks", function () {
    it("responds with json", async function () {
      const response = await request(app).delete("/tasks/12");
      expect(response.statusCode).toBe(500);
    });
  });
});
