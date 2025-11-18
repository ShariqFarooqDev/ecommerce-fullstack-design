import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    maxlength: [100, "Name can not be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
    maxlength: [1000, "Description can not be more than 1000 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
    default: 0,
  },
  originalPrice: {
    type: Number,
    default: null,
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  orders: {
    type: Number,
    default: 0,
  },
  shipping: {
    type: String,
    default: "Standard",
  },
  image: {
    type: String,
    default: "/images/placeholder.png",
  },
  images: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    required: [true, "Please provide a category"],
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  features: {
    type: [String],
    default: [],
  },
  brand: {
    type: String,
    default: "Unbranded",
  },
  condition: {
    type: String,
    enum: ["New", "Used", "Refurbished"],
    default: "New",
  },
});

export default mongoose.model("Product", ProductSchema);
