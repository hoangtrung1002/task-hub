import mongoose, { Document, Schema } from "mongoose";

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  is2FAEnabled: boolean;
  twoFAOtp: string;
  twoFAOtpExpiresAt: Date | null;
  profilePicture: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true, select: false },
    isEmailVerified: { type: Boolean, default: false },
    is2FAEnabled: { type: Boolean, default: false },
    twoFAOtp: { type: String, select: false },
    twoFAOtpExpiresAt: { type: Date, select: false },
    profilePicture: { type: String },
    lastLogin: { type: Date },
  },
  {
    timestamps: true,
  }
);

const UserModel =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
