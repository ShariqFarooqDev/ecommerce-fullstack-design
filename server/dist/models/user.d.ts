import mongoose from "mongoose";
export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    createJWT(): string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=user.d.ts.map