import express from "express";
import type { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect";
import productRouter from "./routes/productRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

import authRouter from "./routes/authRoutes";
import uploadRouter from "./routes/uploadRoutes";
import { authenticateUser } from "./middleware/authMiddleware";
import path from "path";

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/upload", authenticateUser, uploadRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce");
    // Only listen if not running in Vercel (or if executed directly)
    if (require.main === module) {
      app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

start();

export default app;
