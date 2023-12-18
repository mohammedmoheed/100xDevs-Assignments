const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());

function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

function removeAtIndex(arr, index) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) newArray.push(arr[i]);
  }
  return newArray;
}

app.get("/todos", (req, res) => {
  fs.readFile("todos.json", "utf8", function (err, data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.get("/todos/:id", (req, res) => {
  fs.readFile("todos.json", "utf8", function (err, data) {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send("to do not found");
    } else {
      res.json(todos[todoIndex]);
    }
  });
});

app.post("/todos", function (req, res) {
  const { title, description } = req.body;
  if (!(title && description)) {
    res.status(404).send("Title or Description not present ");
  } else {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000), // unique random id
      title,
      description,
    };
    fs.readFile("todos.json", "utf8", (err, data) => {
      if (err) throw err;
      const todos = JSON.parse(data);
      todos.push(newTodo);
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(201).json(newTodo);
      });
    });
  }
});

app.put("/todos/:id", function (req, res) {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send("todo not found");
    } else {
      const { title, description } = req.body;
      if (!(title && description)) {
        res.status(404).send("Title or Description not there");
      } else {
        const updatedTodo = {
          id: todos[todoIndex].id,
          title,
          description,
        };
        todos[todoIndex] = updatedTodo;
        fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
          if (err) throw err;
          res.status(200).json(updatedTodo);
        });
      }
    }
  });
});

app.delete("/todos/:id", function (req, res) {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send("todo not found");
    } else {
      todos = removeAtIndex(todos, todoIndex);
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).send("task deleted");
      });
    }
  });
});

// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(3000, () => {
  console.log(`server listening on port 3000`);
});
module.exports = app;
