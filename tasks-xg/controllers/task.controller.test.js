const controller = require("./tasks.controller.js");
const Task = require("../models/task.model.js");

jest.mock("../models/task");

describe("Given getAllTasks", () => {
  describe("When is triggered", () => {
    test("Then call send", async () => {
      const req = {
        tasks: [],
      };
      const res = {
        send: jest.fn(),
      };

      await controller.getAllTasks(req, res);

      expect(res.send).toHaveBeenCalled();
    });
  });
});
