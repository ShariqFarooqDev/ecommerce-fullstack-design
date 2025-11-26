"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connect_1 = __importDefault(require("./db/connect"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const path_1 = __importDefault(require("path"));
// Serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/api/v1/products", productRoutes_1.default);
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/upload", authMiddleware_1.authenticateUser, uploadRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
const start = async () => {
    try {
        await (0, connect_1.default)(process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce");
        // Only listen if not running in Vercel (or if executed directly)
        if (require.main === module) {
            app.listen(port, () => {
                console.log(`[server]: Server is running at http://localhost:${port}`);
            });
        }
    }
    catch (error) {
        console.log(error);
    }
};
start();
exports.default = app;
//# sourceMappingURL=index.js.map