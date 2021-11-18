import express from "express";
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
  crud.getAllBooks(Task).then((resp) => {
    res.send(resp);
  });
});

app.post("/tasks", (req, res) => {
  crud.insertBook(Task, req.body).then((result) => {
    const newTask = { ...req.body, _id: result.insertedId };
    res.json(newTask);
  });
});

app.get("/tasks/:id", (req, res) => {
  crud.getBookById(Task, req.params.id).then((result) => res.json(result));
});

app.patch("/tasks/:id", (req, res) => {
  crud
    .updateBook(Task, req.params.id, req.body)
    .then((result) => {
      return crud.getBookById(req.params.id);
    })
    .then((updatedTask) => {
      res.json(updatedTask);
    });
});

app.delete("/tasks/:id", (req, res) => {
  crud.deleteBook(Task, req.params.id).then((result) => {
    res.json({ deletedId: req.params.id });
  });
});

app.listen(port, () => {
  console.log(`Server listening in http://localhost:${port}`);
});
