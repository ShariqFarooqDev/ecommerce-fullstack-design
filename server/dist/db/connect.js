"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let isConnected = false;
const connectDB = async (url) => {
    if (isConnected) {
        return;
    }
    try {
        await mongoose_1.default.connect(url);
        isConnected = true;
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};
exports.default = connectDB;
//# sourceMappingURL=connect.js.map