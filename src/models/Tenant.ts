import mongoose, { Document, Schema } from "mongoose";

export interface ITenant extends Document {
  name: string;
  email: string;
  phone: string;
  propertyId: mongoose.Types.ObjectId;
  roomId: mongoose.Types.ObjectId;
  payments: mongoose.Types.ObjectId[];
  active: boolean;
  moveInDate: Date;
  moveOutDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema = new Schema<ITenant>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true },
    phone: { type: String, required: true },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    payments: [{ type: Schema.Types.ObjectId, ref: "Payment" }],
    active: { type: Boolean, default: true },
    moveInDate: { type: Date, default: Date.now },
    moveOutDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Tenant ||
  mongoose.model<ITenant>("Tenant", TenantSchema);
