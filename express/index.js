import express from "express";
const app = express();
const port = process.env.PORT || 3001;

const template = `
  <header>
    <h1>API con Express</h1>
  </header>
`;

let fakeTasks = [
  { id: 1, title: "Una cosa", responsable: "Pepe" },
  { id: 2, title: "Más cosas", responsable: "Ernesto" },
];

const template404 = `
  <header>
    <h1>Página no encontrada</h1>
  </header>
`;

// Middelwares

app.use(express.json());

app.use((req, res, next) => {
  console.log("Midelware");
  next();
});

// Routing

app.get("/", (req, res) => {
  res.send(template);
});

app.get("/tasks", (req, res) => {
  res.json(fakeTasks);
});

app.post("/tasks", (req, res) => {
  const newId = Math.max(...fakeTasks.map((item) => item.id)) + 1;
  const newTask = { ...req.body, id: newId };
  fakeTasks.push(newTask);
  res.json(newTask);
});

app.get("/tasks/:id", (req, res) => {
  const result = fakeTasks.find((item) => +item.id === +req.params.id);
  res.json(result);
});

app.patch("/tasks/:id", (req, res) => {
  const index = fakeTasks.findIndex((item) => +item.id === +req.params.id);
  fakeTasks[index] = { ...fakeTasks[index], ...req.body };
  res.json(fakeTasks[index]);
});

app.delete("/tasks/:id", (req, res) => {
  const initialLength = fakeTasks.length;
  fakeTasks = fakeTasks.filter((item) => +item.id !== +req.params.id);
  res.json({ deleteItems: fakeTasks.length === initialLength - 1 ? 1 : 0 });
});

app.listen(port, () => {
  console.log(`Server listening in http://localhost:${port}`);
});
