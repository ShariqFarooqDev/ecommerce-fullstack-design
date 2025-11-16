import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        maxlength: [100, "Name can not be more than 100 characters"],
    },
    price: {
        type: Number,
        required: [true, "Please provide a price"],
        default: 0,
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
        maxlength: [1000, "Description can not be more than 1000 characters"],
    },
    image: {
        type: String,
        default: "/images/placeholder.png",
    },
    category: {
        type: String,
        required: [true, "Please provide a category"],
        enum: ["electronics", "clothing", "home", "books", "other"],
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
});
export default mongoose.model("Product", ProductSchema);
//# sourceMappingURL=product.js.map