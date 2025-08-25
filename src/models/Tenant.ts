import mongoose, { Document, Schema } from "mongoose";

export interface ITenant extends Document {
  name: string;
  email: string;
  phone: string;
  propertyId: mongoose.Types.ObjectId;
  roomId: mongoose.Types.ObjectId;
  payments: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema = new Schema<ITenant>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    payments: [{ type: Schema.Types.ObjectId, ref: "Payment" }],
  },
  { timestamps: true }
);

export default mongoose.models.Tenant ||
  mongoose.model<ITenant>("Tenant", TenantSchema);
