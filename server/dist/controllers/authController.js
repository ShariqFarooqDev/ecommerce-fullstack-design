"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const register = async (req, res) => {
    try {
        const user = await user_1.default.create({ ...req.body });
        const token = user.createJWT();
        res.status(201).json({ user: { name: user.name, role: user.role }, token });
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Please provide email and password" });
        }
        const user = await user_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "Invalid Credentials" });
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ msg: "Invalid Credentials" });
        }
        const token = user.createJWT();
        res.status(200).json({ user: { name: user.name, role: user.role }, token });
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map