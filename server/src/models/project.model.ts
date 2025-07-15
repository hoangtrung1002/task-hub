import mongoose, { Document, mongo, ObjectId, Schema } from "mongoose";

interface ProjectDocument extends Document {
  title: string;
  description: string;
  workspace: mongoose.Types.ObjectId;
  status: "Planning" | "In Progress" | "On Hold" | "Completed" | "Cancelled";
  startDate: Date;
  dueDate: Date;
  progress: number;
  tasks: mongoose.Types.ObjectId[];
  members: {
    user: mongoose.Types.ObjectId;
    role: "contributor" | "manager" | "viewer";
  }[];
  tags: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  isArchived: boolean;
}

const projectSchema = new Schema<ProjectDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    status: {
      type: String,
      enum: ["Planning", "In Progress", "On Hold", "Completed", "Cancelled"],
      default: "Planning",
    },
    startDate: { type: Date },
    dueDate: { type: Date },
    progress: { type: Number, mix: 0, max: 100, default: 0 },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["contributor", "manager", "viewer"],
          default: "contributor",
        },
      },
    ],
    tags: [{ type: String }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const ProjectModel =
  mongoose.models.Project ||
  mongoose.model<ProjectDocument>("Project", projectSchema);

export default ProjectModel;
