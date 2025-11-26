"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../models/user"));
const connect_1 = __importDefault(require("./connect"));
dotenv_1.default.config();
const seedUsers = async () => {
    try {
        await (0, connect_1.default)(process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce");
        // Delete all existing users
        await user_1.default.deleteMany({});
        console.log("Previous users deleted.");
        // Create Admin User
        const adminUser = await user_1.default.create({
            name: "Shariq Farooq",
            email: "shariq@devhub.com",
            password: "password123",
            role: "admin",
        });
        console.log("Admin user created:");
        console.log(`Name: ${adminUser.name}`);
        console.log(`Email: ${adminUser.email}`);
        console.log(`Password: password123`);
        console.log(`Role: ${adminUser.role}`);
        process.exit(0);
    }
    catch (error) {
        console.error("Error seeding users:", error);
        process.exit(1);
    }
};
seedUsers();
//# sourceMappingURL=seedUsers.js.map