import mongoose, { Document, Schema } from "mongoose";

interface VerificationDocument extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
}

const verificationSchema = new Schema<VerificationDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VerificationModel =
  mongoose.models.Verification ||
  mongoose.model<VerificationDocument>("Verification", verificationSchema);
export default VerificationModel;
