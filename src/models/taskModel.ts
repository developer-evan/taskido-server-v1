// src/models/taskModel.ts
import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  user: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model<ITask>("Task", taskSchema);

export default TaskModel;
