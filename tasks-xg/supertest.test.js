const request = require("supertest");
const app = require("./app.js");

describe("GET /tasks", function () {
  it("responds with json", async function () {
    const response = await request(app).get("/tasks");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /tasks", function () {
  it("responds with json", async function () {
    const response = await request(app).delete("/tasks/12");
    expect(response.statusCode).toBe(500);
  });
});
