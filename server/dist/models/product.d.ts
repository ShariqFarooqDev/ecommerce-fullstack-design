import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    name: string;
    price: number;
    description: string;
    image: string;
    category: "electronics" | "clothing" | "home" | "books" | "other";
    stock: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    price: number;
    description: string;
    image: string;
    category: "electronics" | "clothing" | "home" | "books" | "other";
    stock: number;
}, {}, mongoose.DefaultSchemaOptions> & {
    name: string;
    price: number;
    description: string;
    image: string;
    category: "electronics" | "clothing" | "home" | "books" | "other";
    stock: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    price: number;
    description: string;
    image: string;
    category: "electronics" | "clothing" | "home" | "books" | "other";
    stock: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    price: number;
    description: string;
    image: string;
    category: "electronics" | "clothing" | "home" | "books" | "other";
    stock: number;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    price: number;
    description: string;
    image: string;
    category: "electronics" | "clothing" | "home" | "books" | "other";
    stock: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=product.d.ts.map