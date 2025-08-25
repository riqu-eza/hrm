import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "property-admin" ;
  propertyId?: mongoose.Types.ObjectId; // null for superadmin
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["superadmin", "property-admin"],
      required: true,
      default: "property-admin",
    },
    propertyId: { type: Schema.Types.ObjectId, ref: "Property" },
    isEmailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
