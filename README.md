# Ecommerce Fullstack Design

A fully functional eCommerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project demonstrates a modern, responsive e-commerce platform with dynamic content, user authentication, cart management, and an admin dashboard.

## 🚀 Features

-   **Responsive Design:** Fully responsive UI for desktop and mobile using Tailwind CSS.
-   **Product Management:** Browse products by category, search by name/description, and view detailed product information.
-   **User Authentication:** Secure login and registration using JWT (JSON Web Tokens).
-   **Shopping Cart:** Add/remove items, update quantities, and persistent cart state using LocalStorage.
-   **Admin Panel:** Protected admin route to manage products (view and delete).
-   **Wishlist:** Save items for later.
-   **Dynamic Content:** Real-time data fetching from a MongoDB database.

## 🛠️ Tech Stack

-   **Frontend:** React (Vite), TypeScript, Tailwind CSS, React Router DOM
-   **Backend:** Node.js, Express.js, TypeScript
-   **Database:** MongoDB (Mongoose)
-   **Authentication:** JWT, bcryptjs

## 📂 Project Structure

```
ecommerce-fullstack-design/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context (Auth)
│   │   ├── pages/          # Application pages (Home, Product, Cart, etc.)
│   │   └── services/       # API service calls
├── server/                 # Backend Express application
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── db/             # Database connection and seeding
```

## ⚙️ Installation & Setup

### Prerequisites

-   Node.js (v14+ recommended)
-   MongoDB (Local or Atlas URI)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ecommerce-fullstack-design.git
cd ecommerce-fullstack-design
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
JWT_LIFETIME=1d
```

Seed the database with sample data:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal, navigate to the client directory, and install dependencies:

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The application should now be running at `http://localhost:5173` (or the port specified by Vite).

## 🧪 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/products` | Get all products |
| `GET` | `/api/v1/products/:id` | Get single product |
| `POST` | `/api/v1/auth/register` | Register a new user |
| `POST` | `/api/v1/auth/login` | Login user |
| `DELETE` | `/api/v1/products/:id` | Delete product (Admin only) |

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
