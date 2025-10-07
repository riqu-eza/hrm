import mongoose, { Document, Schema } from "mongoose";

export interface ILedgerEntry {
  tenantId?: mongoose.Types.ObjectId;
  paymentId?: mongoose.Types.ObjectId;
  type: "credit" | "debit";
  amount: number;
  date: Date;
  description: string;
}

export interface ILedger extends Document {
  propertyId: mongoose.Types.ObjectId;
  roomId: mongoose.Types.ObjectId;
  entries: ILedgerEntry[];
  totalPaid: number;
  totalDue: number;
  balance: number;
  updatedAt: Date;
}

const LedgerEntrySchema = new Schema<ILedgerEntry>(
  {
    tenantId: { type: Schema.Types.ObjectId, ref: "Tenant" },
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment" },
    type: { type: String, enum: ["credit", "debit"], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String, trim: true },
  },
  { _id: false }
);

const LedgerSchema = new Schema<ILedger>(
  {
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    entries: [LedgerEntrySchema],
    totalPaid: { type: Number, default: 0 },
    totalDue: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Ledger ||
  mongoose.model<ILedger>("Ledger", LedgerSchema);
