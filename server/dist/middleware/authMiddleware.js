"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Authentication invalid" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ msg: "Authentication invalid" });
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }
        const payload = jsonwebtoken_1.default.verify(token, secret);
        req.user = { userId: payload.userId, name: payload.name, role: payload.role };
        next();
    }
    catch (error) {
        return res.status(401).json({ msg: "Authentication invalid" });
    }
};
exports.authenticateUser = authenticateUser;
const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ msg: "Access denied. Admin privileges required." });
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
//# sourceMappingURL=authMiddleware.js.map