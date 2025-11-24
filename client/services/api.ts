import { Product } from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3000/api/v1';

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductById = async (id: string | number): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const data = await response.json();
    return data.product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
};

export const createProduct = async (productData: Partial<Product>): Promise<Product> => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`,
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || 'Failed to create product');
  }
  const data = await response.json();
  return data.product;
};

export const updateProduct = async (id: number, productData: Partial<Product>): Promise<Product> => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`,
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || 'Failed to update product');
  }
  const data = await response.json();
  return data.product;
};

export const uploadImage = async (file: File): Promise<string> => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || 'Failed to upload image');
  }

  const data = await response.json();
  return data.image;
};
