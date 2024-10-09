import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import bodyParser = require("body-parser");

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const express = require("express");
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;

if (!MONGOURL) {
  console.error("MongoDB URL is not defined in the environment variables");
  process.exit(1);
}
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

const app = express();
app.use(bodyParser.json());

// Define the schema
const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

// Define the model
const TaskModel = mongoose.model("tasks", todoSchema);



// let todos: Todo[] = [
//   { id: "1", title: "Learn TypeScript", completed: false },
//   { id: "2", title: "Learn Node.js", completed: false },
//   { id: "3", title: "Learn Express", completed: false },
//   { id: "7", title: "Learn MongoDB", completed: false },
//   { id: "11", title: "Learn Redux", completed: false },
// ];

// Get all todos
// app.get("/todos", (req: any, res: any) => {
//   res.json(todos);
// });

// Get all todos
app.get("/getTasks", async (req: any, res: any) => {
  const tasks = await TaskModel.find();
  res.json(tasks);
});



// // Create new todo
// app.post("/todos", (req: any, res: any) => {
//   const todo = {
//     id: uuidv4(),
//     title: req.body.title,
//     completed: req.body.completed || false,
//   };
//   todos.push(todo);
//   res.status(201).json(todo);
// });

// // Get todo by ID
// app.get("/todos/:id", (req: any, res: any) => {
//   const id = req.params.id;
//   const todo = todos.find((todo) => todo.id === id);
//   if (!todo) {
//     return res.status(404).json({ message: "Todo not found" });
//   }
//   res.json(todo);
// });

// // Update todo by ID
// app.patch("/todos/:id", (req: any, res: any) => {
//   const id = req.params.id;
//   const todo = todos.find((todo) => todo.id === id);
//   if (!todo) {
//     return res.status(404).json({ message: "Todo not found" });
//   }
//   todo.title = req.body.title || todo.title;
//   todo.completed = req.body.completed || todo.completed;
//   res.json(todo);
// });

// // Delete todo by ID
// app.delete("/todos/:id", (req: any, res: any) => {
//   const id = req.params.id;
//   const index = todos.findIndex((todo) => todo.id === id);
//   if (index === -1) {
//     return res.status(404).json({ message: "Todo not found" });
//   }
//   todos.splice(index, 1);
//   res.status(204).json();
// });
