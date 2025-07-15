import mongoose, { Schema } from "mongoose";

interface CommentDocument extends Document {
  text: string;
  task: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  mentions: { user: mongoose.Types.ObjectId; offset: number; length: number }[];
  reactions: { emoji: string; user: mongoose.Types.ObjectId }[];
  attachments: {
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
  }[];
  isEdited: boolean;
}

const commentSchema = new Schema<CommentDocument>(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentions: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        offset: {
          type: Number,
        },
        length: {
          type: Number,
        },
      },
    ],
    reactions: [
      {
        emoji: {
          type: String,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    attachments: [
      {
        fileName: { type: String },
        fileUrl: { type: String },
        fileType: { type: String },
        fileSize: { type: Number },
      },
    ],
    isEdited: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const CommentModel =
  mongoose.models.Comment ||
  mongoose.model<CommentDocument>("Comment", commentSchema);

export default CommentModel;
