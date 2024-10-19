import { Request, Response, NextFunction } from "express";
import TaskModel from "../models/taskModel";

// export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const tasks = await TaskModel.find();
//     res.json({ message: "Tasks retrieved successfully", tasks });
//   } catch (error) {
//     next(error); // Pass the error to the next middleware (error handler)
//   }
// };
export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user.id; // Assume req.user is populated by middleware
    const tasks = await TaskModel.find({ user: userId });
    res.json({ message: "Tasks retrieved successfully", tasks });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task retrieved successfully", task });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
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
    next(error); // Pass the error to the next middleware (error handler)
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.completed =
      req.body.completed !== undefined ? req.body.completed : task.completed;
    await task.save();
    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.deleteOne();
    res.status(204).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
};
