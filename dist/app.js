"use strict";
// types 
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
let todos = [];
// get all todos
app.get("/todos", (req, res) => {
    res.json(todos);
});
// create new to do
app.post("/todos", (req, res) => {
    const todo = {
        // unique id
        // id: todos.length+1,
        id: Math.random().toString(),
        title: req.body.title,
        completed: req.body.completed || false,
    };
    todos.push(todo);
    res.status(201).json(todo);
});
// run the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
