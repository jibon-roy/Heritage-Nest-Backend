import { Schema } from "mongoose";

export const propertySchema = new Schema({
  property_name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  bid_price_max: {
    type: Number,
    required: true,
  },
  bid_price_min: {
    type: Number,
    required: true,
  },
  OverView: {
    bed: {
      type: Number,
      required: true,
    },
    bath: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    floor: {
      type: String,
      required: true,
    },
    publish: {
      type: Date,
      required: true,
    },
    winner: {
      type: String,
      default: null,
    },
  },
  bid_requests: [
    {
      type: Schema.Types.Mixed,
      default: [],
    },
  ],
  property_owner: {
    type: String,
    required: true,
  },
  property_type: {
    type: String,
    required: true,
  },
  pictures: [
    {
      type: String,
      required: true,
    },
  ],
});
