import mongoose, { Document, Schema } from "mongoose";

export interface IRoom extends Document {
  name: string;
  type: string;
  price: number;
  status: "available" | "occupied";
  propertyId: mongoose.Types.ObjectId;
  tenantId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema = new Schema<IRoom>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., Single, Double
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "occupied"],
      default: "available",
    },
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    tenantId: { type: Schema.Types.ObjectId, ref: "Tenant" },
  },
  { timestamps: true }
);

export default mongoose.models.Room ||
  mongoose.model<IRoom>("Room", RoomSchema);
