# API Integration Setup Guide

## What Was Changed

Your e-commerce platform has been updated to fetch products from the backend instead of using hardcoded mock data.

### Files Created
1. **`client/services/api.ts`** - API service layer for backend communication
2. **`client/.env`** - Environment variables for API configuration
3. **`client/.env.example`** - Example environment file

### Files Updated
1. **`client/pages/HomePage.tsx`** - Now fetches products from backend for "Recommended items" section
2. **`client/pages/ProductListPage.tsx`** - Now fetches all products from backend with dynamic filtering
3. **`client/pages/ProductDetailPage.tsx`** - Now fetches product details from backend

## How It Works

### API Service (`client/services/api.ts`)
```typescript
- getAllProducts(): Fetches all products from /api/v1/products
- getProductById(id): Fetches a specific product (optional for future use)
```

### Data Flow
1. Components call `productApi.getAllProducts()` on mount
2. API service hits your backend endpoint: `http://localhost:3000/api/v1/products`
3. Backend returns products from MongoDB
4. Frontend displays the fetched products with loading states

## Running the Application

### Step 1: Start Backend Server
```bash
cd server
npm install
npm run dev
```
This starts the backend on `http://localhost:3000`

### Step 2: Start Client Application
```bash
cd client
npm install
npm run dev
```
This starts the frontend on `http://localhost:5173` (or shown in terminal)

## Key Features

✅ **Dynamic Product Loading** - Products load from backend database
✅ **Loading States** - Shows "Loading..." message while fetching
✅ **Error Handling** - Gracefully handles failed requests
✅ **Dynamic Filtering** - Filters update based on actual product data
✅ **Environment Configuration** - Easy to change API URL via `.env`

## API Endpoint Used

**GET** `/api/v1/products`

Expected Response:
```json
{
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "price": 99.99,
      "image": "image-url",
      "description": "...",
      // ... other product fields
    }
  ]
}
```

## Environment Configuration

If you need to change the API URL, edit `client/.env`:
```
VITE_API_URL=http://localhost:3000/api/v1
```

## Troubleshooting

### Products not loading?
1. Check backend is running on `http://localhost:3000`
2. Verify MongoDB connection in backend
3. Check browser console for error messages
4. Ensure `.env` file has correct API URL

### CORS errors?
Backend already has CORS enabled. If you get CORS errors:
1. Check backend index.ts has `app.use(cors())`
2. Ensure backend is accessible from frontend URL

### Empty filters on ProductListPage?
- Filters are now dynamic based on actual product data
- Make sure you have products in your MongoDB database
- Run the seed script: `npm run seed` in the server directory
