# Testing the API Integration

## Running the Seed Script

To populate your database with 15 mock products, follow these steps:

### Prerequisites
Make sure MongoDB is running on your system.

### Step 1: Install Backend Dependencies
```bash
cd server
npm install
```

### Step 2: Run the Seed Script
```bash
npm run seed
```

You should see output like:
```
Successfully seeded 15 products!
```

### Step 3: Start the Backend Server
```bash
npm run dev
```

The backend will be available at `http://localhost:3000`

### Step 4: Start the Frontend in Another Terminal
```bash
cd client
npm install
npm run dev
```

## Mock Products Added

The seed script adds 15 realistic products across multiple categories:

### Electronics (5 products)
- GoPro HERO6 4K Action Camera - $998.00
- Canon Camera EOS 2000 - $899.99
- Smart watches - $199.00
- Modern Laptop with SSD - $1,340.00
- Gaming Headset - $89.99

### Clothing (4 products)
- Brown winter coat - $149.99
- T-shirts - $29.99
- Jeans bag - $79.95
- Jeans shorts - $54.99

### Home & Other (6 products)
- Travel Bag - $129.99
- Soft Leather Sofa - $499.99
- Kitchen Mixer - $199.99
- Electric Blender - $79.99
- Coffee Maker - $89.99
- Smart LED Desk Lamp - $49.99

## Verifying the API Works

### Option 1: Test in Browser
Open: `http://localhost:3000/api/v1/products`

You should see JSON response with all 15 products.

### Option 2: Test with cURL
```bash
curl http://localhost:3000/api/v1/products
```

### Option 3: Check the Frontend
Navigate to:
- Homepage: See products in "Recommended items" section
- Products page: See all products with filters dynamically populated by brand and features

## Troubleshooting

### "MongoDB connection failed"
- Make sure MongoDB is running
- Check `.env` file has correct MONGO_URI

### "npm run seed: command not found"
- Verify you're in the `server` directory
- Check `package.json` has the seed script defined

### Products not showing on frontend
1. Check backend is running: `http://localhost:3000/api/v1/products`
2. Check browser console for errors
3. Verify `.env` file in client directory has correct API URL

## Re-seeding the Database

If you want to refresh the database with fresh mock data, just run:
```bash
npm run seed
```

This will delete all existing products and add the 15 mock products again.
