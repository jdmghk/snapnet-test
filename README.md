# Snapnet E-commerce Test

A secure and scalable RESTful API for an e-commerce platform built with Node.js, Express, and SQLite. This API provides user authentication, product management, and order processing capabilities.

## Features

- 🔐 **Secure Authentication**
  - JWT-based authentication system
  - Secure password hashing
  - Protected routes

- 📦 **Product Management**
  - CRUD operations for products
  - Search and filtering functionality
  - Inventory tracking

- 🛒 **Order Processing**
  - Order creation and management
  - Order history tracking
  - Status updates

- 👤 **User Management**
  - User registration
  - Account management
  - Order history

## Tech Stack

- Node.js
- Express.js
- SQLite3
- JSON Web Tokens (JWT)
- bcrypt

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `GET /api/products/search` - Search products

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - List user's orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (Admin)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/snapnet-test.git
cd snapnet-test
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
JWT_SECRET=your_jwt_secret_here
PORT=4000
```

4. Initialize database:
```bash
npm run init-db
```

5. Start the server:
```bash
npm start
```

## Testing

Run the test suite:
```bash
npm test
```

## Environment Variables

- `JWT_SECRET` - Secret key for JWT token generation
- `PORT` - Server port (default: 4000)

## Project Structure

```
├── db/
│   └── ecommerce.db
├── routes/
│   ├── auth.js
│   ├── products.js
│   └── orders.js
├── middleware/
│   └── auth.js
├── .env
├── .gitignore
└── app.js
```

## Security Features

- JWT Authentication
- Password Hashing
- Input Validation
- Error Handling
- SQL Injection Prevention

## License

This project is licensed under the MIT License - see the LICENSE file for details.
