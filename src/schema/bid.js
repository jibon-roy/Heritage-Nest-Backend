import mongoose, { model, Schema } from "mongoose";

const bidSchema = new Schema({
  max: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  bidder: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Bid = model("bid", bidSchema);
