import { Router } from "express";
import {
  createTask,
  deleteTask,
  getExpiredTasks,
  getTaskById,
  getTasks,
  updateTask,
} from "../controllers/taskController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

router.get("/getTasks", authenticateUser, getTasks);
router.get("/getTask/:id", authenticateUser, getTaskById);
router.post("/createTask", authenticateUser, createTask);
router.patch("/updateTask/:id", authenticateUser, updateTask);
router.delete("/deleteTask/:id", authenticateUser, deleteTask);
router.get("/getExpiredTasks", authenticateUser, getExpiredTasks);

export default router;
