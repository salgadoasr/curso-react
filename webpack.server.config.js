/* eslint-disable no-commonjs */
const bodyParser = require("body-parser");

let todos = [];

let id = 0;

const addTodo = ({ text, done = false }) => {
  id = id + 1;

  const todo = {
    id,
    text,
    done,
  };

  todos = [...todos, todo];
  return todo;
};

const updateTodo = ({ id, text, done }) => {
  const index = todos.findIndex(t => t.id === id);
  const todo = {
    ...todos[index],
    ...(typeof text !== "undefined" && { text }),
    ...(typeof done !== "undefined" && { done }),
  };
  todos = [...todos.slice(0, index), todo, ...todos.slice(index + 1)];
};

const removeTodo = id => {
  todos = todos.filter(t => t.id !== id);
};

addTodo({ text: "Gestionar estado: todos como done o pending" });
addTodo({ text: "Gestionar estado y formularios: añadir todo, eliminar todo" });
addTodo({ text: "Enganchar datos con el backend REST mock" });
addTodo({ text: "Tests!" });

module.exports = app => {
  app.use(bodyParser.json());

  app.get("/todos", (req, res) => {
    res.json(todos);
  });

  app.post("/todos", (req, res) => {
    const todo = addTodo(req.body);
    res.status(201).json(todo);
  });

  app.put("/todos/:id", (req, res) => {
    updateTodo({ ...req.body, id: Number(req.params.id) });
    res.sendStatus(204);
  });

  app.delete("/todos/:id", (req, res) => {
    removeTodo(Number(req.params.id));
    res.sendStatus(204);
  });
};
