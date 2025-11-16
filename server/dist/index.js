import express, {} from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect.js";
import productRouter from "./routes/productRoutes.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/api/v1/products", productRouter);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce");
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=index.js.map