import { Router } from "express";
import {
  createTask,
  deleteTask,
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

export default router;
