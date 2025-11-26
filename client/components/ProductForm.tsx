import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { SERVER_URL } from '../services/api';


interface ProductFormProps {
    product?: Product | null;
    onSubmit: (productData: Partial<Product>) => Promise<void>;
    onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        originalPrice: 0,
        category: 'electronics',
        stock: 0,
        brand: '',
        condition: 'New' as 'New' | 'Used' | 'Refurbished',
        image: '',
        shipping: 'Standard',
        features: [] as string[],
    });
    const [featureInput, setFeatureInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || 0,
                originalPrice: product.originalPrice || 0,
                category: product.category || 'electronics',
                stock: product.stock || 0,
                brand: product.brand || '',
                condition: product.condition || 'New',
                image: product.image || '',
                shipping: product.shipping || 'Standard',
                features: product.features || [],
            });
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'originalPrice' || name === 'stock'
                ? parseFloat(value) || 0
                : value
        }));
    };

    const handleAddFeature = () => {
        if (featureInput.trim()) {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, featureInput.trim()]
            }));
            setFeatureInput('');
        }
    };

    const handleRemoveFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB');
            return;
        }

        setUploading(true);
        setError('');

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, image: reader.result as string }));
            setUploading(false);
        };
        reader.onerror = () => {
            setError('Failed to read file');
            setUploading(false);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (!formData.name || !formData.description || formData.price <= 0) {
            setError('Please fill in all required fields');
            setLoading(false);
            return;
        }

        try {
            const submitData: Partial<Product> = {
                ...formData,
                images: [formData.image],
                rating: product?.rating || 4.0,
                reviews: product?.reviews || 0,
                orders: product?.orders || 0,
            };

            await onSubmit(submitData);
        } catch (err: any) {
            console.error("Form submission error:", err);
            setError(err.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        {product ? 'Edit Product' : 'Create New Product'}
                    </h2>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* ... (other fields remain unchanged) ... */}

                        {/* Image Upload Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Product Image *
                            </label>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100"
                                    disabled={uploading}
                                />
                                {uploading && <span className="text-sm text-gray-500">Processing...</span>}
                            </div>
                            {formData.image && (
                                <div className="mt-2">
                                    <img
                                        src={formData.image.startsWith('http') || formData.image.startsWith('data:') ? formData.image : `${SERVER_URL}${formData.image}`}
                                        alt="Preview"
                                        className="h-20 w-20 object-cover rounded-md border"
                                    />
                                    <input
                                        type="hidden"
                                        name="image"
                                        value={formData.image}
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Shipping
                            </label>
                            <select
                                name="shipping"
                                value={formData.shipping}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Free Shipping">Free Shipping</option>
                                <option value="Standard">Standard</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Features
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={featureInput}
                                    onChange={(e) => setFeatureInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                                    placeholder="Add a feature"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddFeature}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.features.map((feature, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                    >
                                        {feature}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFeature(index)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default ProductForm;
