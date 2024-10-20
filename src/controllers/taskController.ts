import { Request, Response, NextFunction } from "express";
import TaskModel from "../models/taskModel";

// Get tasks for the authenticated user
export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = req.user?.id;
    const tasks = await TaskModel.find({ user: userId });
    res.json({ message: "Tasks retrieved successfully", tasks });
  } 
  catch (error) {
    next(error);
  }
};

// Get a single task by ID for the authenticated user
export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = req.user?.id;
    const task = await TaskModel.findOne({ _id: req.params.id, user: userId });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task retrieved successfully", task });
  } catch (error) {
    next(error);
  }
};

// Create a task for the authenticated user
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = req.user.id;
    const task = new TaskModel({
      user: userId,
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      completed: req.body.completed || false,
    });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    next(error);
  }
};

// Update a task by ID for the authenticated user
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = req.user?.id;
    const task = await TaskModel.findOne({ _id: req.params.id, user: userId });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.completed =
      req.body.completed !== undefined ? req.body.completed : task.completed;
    await task.save();
    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    next(error);
  }
};

// Delete a task by ID for the authenticated user
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = req.user.id;
    const task = await TaskModel.findOne({ _id: req.params.id, user: userId });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await task.deleteOne();
    res.status(204).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// expired tasks 
export const getExpiredTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const currentDate = new Date();
    const expiredTasks = await TaskModel.find({ dueDate: { $lt: currentDate } });

    // Here you can implement the logic to send notifications, for now, we'll just log them
    if (expiredTasks.length > 0) {
      console.log("Expired tasks:", expiredTasks);
      res.json({ message: "Expired tasks retrieved successfully", expiredTasks });
    } else {
      res.json({ message: "No expired tasks found" });
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
};
