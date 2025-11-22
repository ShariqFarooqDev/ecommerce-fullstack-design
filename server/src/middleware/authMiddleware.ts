import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: { userId: string; name: string; role: string };
}

export const authenticateUser = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Authentication invalid" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || "jwtSecret") as {
            userId: string;
            name: string;
            role: string;
        };
        req.user = { userId: payload.userId, name: payload.name, role: payload.role };
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Authentication invalid" });
    }
};
