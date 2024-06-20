const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];
let currentId = 1;

// GET /todos: Retrieve a list of all todo items.
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST /todos: Create a new todo item.
app.post("/todos", (req, res) => {
  const { title, completed = false } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTodo = { id: currentId++, title, completed };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// GET /todos/:id: Retrieve a specific todo item by its ID.
app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id == id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json(todo);
});
// http://localhost:3000/todos

// PUT /todos/:id: Update a todo item by its ID.
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = todos.find((todo) => todo.id == id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  if (title !== undefined) {
    todo.title = title;
  }
  if (completed !== undefined) {
    todo.completed = completed;
  }

  res.json(todo);
});

// DELETE /todos/:id: Delete a todo item by its ID.
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((todo) => todo.id == id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todos.splice(todoIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Add additional fields to the todo items

const newTodo = {
  id: currentId++,
  title,
  completed,
  description: req.body.description,
  dueDate: req.body.dueDate,
};

if (description && typeof description !== "string") {
  return res.status(400).json({ error: "Description must be a string" });
}
if (dueDate && isNaN(Date.parse(dueDate))) {
  return res.status(400).json({ error: "Invalid dueDate" });
}
