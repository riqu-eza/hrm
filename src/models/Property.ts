import mongoose, { Document, Schema } from "mongoose";

export interface IProperty extends Document {
  name: string;
  address: string;
  adminIds: mongoose.Types.ObjectId[];
  rooms: mongoose.Types.ObjectId[];
  services: {
    name: string;
    price: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema = new Schema<IProperty>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    adminIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
    services: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Property ||
  mongoose.model<IProperty>("Property", PropertySchema);
