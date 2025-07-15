import mongoose, { Document, mongo, ObjectId, Schema } from "mongoose";

interface TaskDocument extends Document {
  title: string;
  description: string;
  project: mongoose.Types.ObjectId;
  status: "To Do" | "In Progress" | "Review" | "Done";
  priority: "Low" | "Medium" | "High";
  assignees: mongoose.Types.ObjectId[];
  watchers: mongoose.Types.ObjectId[];
  dueDate: Date;
  completedAt: Date;
  estimateHours: number;
  actualHours: number;
  tags: mongoose.Types.ObjectId[];
  subTasks: {
    title: string;
    completed: boolean;
    createdAt: Date;
  }[];
  comments: string[];
  attachments: {
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    uploadedBy: mongoose.Types.ObjectId;
    uploadedAt: Date;
  }[];
  createdBy: mongoose.Types.ObjectId;
  isArchived: boolean;
}

const taskSchema = new Schema<TaskDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Review", "Done"],
      default: "To Do",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    assignees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    watchers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dueDate: { type: Date },
    completedAt: { type: Date },
    estimateHours: { type: Number, min: 0 },
    actualHours: { type: Number, min: 0 },
    tags: [{ type: String }],
    subTasks: [
      {
        title: {
          type: String,
          required: true,
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    attachments: [
      {
        fileName: { type: String, required: true },
        fileUrl: { type: String, required: true },
        fileType: { type: String },
        fileSize: { type: Number },
        uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const TaskModel =
  mongoose.models.Task || mongoose.model<TaskDocument>("Task", taskSchema);

export default TaskModel;
