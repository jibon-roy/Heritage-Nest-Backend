import connectDB from "../../config/db/db.js";
import { Property } from "../../models/property.js";

const postProperty = async (req, res) => {
  await connectDB();
  const propertyData = req.body;
  try {
    const newProperty = new Property(propertyData);
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPropertyById = async (req, res) => {
  await connectDB();
  const { id } = req.params;

  try {
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    console.error("Error retrieving property:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllProperty = async (req, res) => {
  await connectDB();
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    console.error("Error retrieving properties:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const filterProperties = async (req, res) => {
  await connectDB();
  const { budget, category, location, propertyType, search } = req.body;

  const query = {};
  if (budget) {
    query.bid_price_max = { $lte: parseInt(budget) };
  }
  if (category) {
    query.category = category;
  }
  if (location) {
    query.location = location;
  }
  if (propertyType) {
    query.propertyType = propertyType;
  }
  if (search) {
    query.$text = { $search: search };
  }
  try {
    const properties = await Property.find(query);

    if (properties.length === 0) {
      return res.status(404).json({ message: "No properties found" });
    }

    res.json(properties);
  } catch (error) {
    console.error("Error filtering properties:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPropertyByEmail = async (req, res) => {
  try {
    await connectDB();
    const email = req.params.email;

    const properties = await Property.find({ property_owner: email });

    if (properties.length === 0) {
      return res.status(404).json({ message: "No properties found" });
    }
    res.json(properties);
  } catch (error) {
    console.error("Error retrieving properties:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProperty = async (req, res) => {
  await connectDB();
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedProperty = await Property.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(updatedProperty);
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProperty = async (req, res) => {
  await connectDB();
  const { id } = req.params;

  try {
    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  postProperty,
  getPropertyById,
  getAllProperty,
  updateProperty,
  deleteProperty,
  getPropertyByEmail,
  filterProperties,
};
