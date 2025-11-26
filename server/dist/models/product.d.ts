import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    orders: number;
    shipping: string;
    image: string;
    images: string[];
    category: string;
    stock: number;
    features: string[];
    brand: string;
    condition: "New" | "Used" | "Refurbished";
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    orders: number;
    shipping: string;
    image: string;
    images: string[];
    category: string;
    stock: number;
    features: string[];
    brand: string;
    condition: "New" | "Used" | "Refurbished";
}, {}, mongoose.DefaultSchemaOptions> & {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    orders: number;
    shipping: string;
    image: string;
    images: string[];
    category: string;
    stock: number;
    features: string[];
    brand: string;
    condition: "New" | "Used" | "Refurbished";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    orders: number;
    shipping: string;
    image: string;
    images: string[];
    category: string;
    stock: number;
    features: string[];
    brand: string;
    condition: "New" | "Used" | "Refurbished";
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    orders: number;
    shipping: string;
    image: string;
    images: string[];
    category: string;
    stock: number;
    features: string[];
    brand: string;
    condition: "New" | "Used" | "Refurbished";
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    orders: number;
    shipping: string;
    image: string;
    images: string[];
    category: string;
    stock: number;
    features: string[];
    brand: string;
    condition: "New" | "Used" | "Refurbished";
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=product.d.ts.map