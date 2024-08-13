import mongoose from "mongoose";
import { propertySchema } from "../schema/property.js";

export const Property = mongoose.model("Properties", propertySchema);
