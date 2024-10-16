import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import bodyParser = require("body-parser");

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
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
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });

const app = express();
app.use(bodyParser.json());

// const taskSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   completed: { type: Boolean, default: false },
// });

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true } // This adds createdAt and updatedAt fields
);

// Define the model
const TaskModel = mongoose.model("tasks", taskSchema);

// Get all tasks
app.get("/getTasks", async (req: any, res: any) => {
  try {
    const tasks = await TaskModel.find();
    res.json({ message: "Tasks retrieved successfully", tasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

// Get task by ID
app.get("/getTask/:id", async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task retrieved successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
});

app.post("/createTask", async (req: any, res: any) => {
  try {
    const task = new TaskModel({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      completed: req.body.completed || false,      
    });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
});

app.patch("/updateTask/:id", async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
    await task.save();
    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
});


app.delete("/deleteTask/:id", async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.deleteOne();
    res.status(204).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
});
