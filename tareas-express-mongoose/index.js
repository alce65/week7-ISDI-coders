import express, { json } from "express";
import morgan from "morgan";
import { tasksConnect } from "./db/db.js";
import * as crud from "./db/crud.js";
const app = express();
const port = process.env.PORT;

const template = `
  <header>
    <h1>API con Express</h1>
  </header>
`;

const template404 = `
  <header>
    <h1>Página no encontrada</h1>
  </header>
`;

const Task = await tasksConnect();

// Middelwares

app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Midelware");
  next();
});

// Routing

app.get("/", (req, res) => {
  res.json(template);
});

app.get("/tasks", (req, res) => {
  crud.getAllTasks(Task).then((resp) => {
    res.send(resp);
  });
});

app.post("/tasks", (req, res) => {
  crud.insertTask(Task, req.body).then((result) => {
    // const newTask = { ...req.body, _id: result.insertedId };
    console.log(result);
    res.json(result);
  });
});

app.get("/tasks/:id", (req, res) => {
  crud.getTaskById(Task, req.params.id).then((result) => res.json(result));
});

app.patch("/tasks/:id", (req, res) => {
  crud
    .updateTask(Task, req.params.id, req.body)
    /* .then((result) => {
      return crud.getTaskById(req.params.id);
    }) */
    .then((updatedTask) => {
      res.json(updatedTask);
    });
});

app.delete("/tasks/:id", (req, res, next) => {
  crud
    .deleteTask(Task, req.params.id)
    .then((result) => {
      if (result) {
        res.status(202).json({ deletedId: req.params.id });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

app.use((err, req, res, next) => {
  console.log("Gestión e errores");
  res.status(406).json({ name: err.name, msg: err.message });
});

app.listen(port, () => {
  console.log(`Server listening in http://localhost:${port}`);
});
