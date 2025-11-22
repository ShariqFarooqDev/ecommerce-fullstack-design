import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user";
import connectDB from "./connect";

dotenv.config();

const seedUsers = async () => {
    try {
        await connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce");

        // Delete all existing users
        await User.deleteMany({});
        console.log("Previous users deleted.");

        // Create Admin User
        const adminUser = await User.create({
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
    } catch (error) {
        console.error("Error seeding users:", error);
        process.exit(1);
    }
};

seedUsers();
