import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
  tenantId: mongoose.Types.ObjectId;
  propertyId: mongoose.Types.ObjectId;
  roomId: mongoose.Types.ObjectId;
  amount: number;
  status: "paid" | "pending" | "failed";
  method: "mpesa" | "card" | "cash";
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true },
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "pending",
    },
    method: {
      type: String,
      enum: ["mpesa", "card", "cash"],
      required: true,
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model<IPayment>("Payment", PaymentSchema);
