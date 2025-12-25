# YORI Fashion Backend API

Backend API cho YORI Fashion e-commerce platform, được xây dựng với Express.js, TypeScript, và MongoDB.

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.x
- MongoDB (hoặc MongoDB Atlas)
- npm hoặc yarn

### Installation

1. Clone repository và navigate vào thư mục `be`:
   ```bash
   cd be
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Tạo file `.env` từ `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Điền các giá trị cần thiết vào `.env`:
   - Database credentials (DB_USERNAME, DB_PASSWORD, DB_NAME)
   - JWT_SECRET (generate một random string)
   - SMTP config (nếu muốn gửi email)

5. Seed database với initial data:
   ```bash
   npm run db:seed
   ```

6. Start development server:
   ```bash
   npm run dev
   ```

Server sẽ chạy tại `http://localhost:5000`

## 📚 Documentation

- **[API Documentation](./API_DOCUMENTATION.md)** - Chi tiết về tất cả API endpoints
- **[Environment Variables](./ENVIRONMENT_VARIABLES.md)** - Documentation về environment variables
- **[Seed Data](./SEED_DATA.md)** - Hướng dẫn về seed data và default credentials
- **[Test Checklist](./TEST_CHECKLIST.md)** - API testing checklist

## 🏗️ Project Structure

```
be/
├── src/
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── models/           # Data models và schemas
│   ├── routes/           # API routes
│   ├── middlewares/      # Express middlewares
│   ├── utils/            # Utility functions
│   ├── constants/        # Constants và enums
│   ├── docs/             # OpenAPI specifications
│   └── index.ts          # Entry point
├── .env.example          # Environment variables template
├── package.json
└── tsconfig.json
```

## 🔑 Default Credentials

Sau khi chạy seed script:

- **Admin**: `admin@yori.com` / `admin123`
- **Test Users**: 
  - `customer1@test.com` / `123456`
  - `customer2@test.com` / `123456`
  - `customer3@test.com` / `123456`

## 📝 Available Scripts

- `npm run dev` - Start development server với nodemon
- `npm run db:seed` - Seed database với initial data
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run prettier` - Check code formatting
- `npm run prettier:fix` - Fix code formatting

## 🔐 Authentication

API sử dụng JWT (JSON Web Tokens) cho authentication:

- **Access Token**: Hết hạn sau 15 phút (mặc định)
- **Refresh Token**: Hết hạn sau 30 ngày (mặc định)

Xem chi tiết trong [API Documentation](./API_DOCUMENTATION.md).

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **Email**: Nodemailer (optional)

## 📦 API Endpoints

### Public Endpoints

- `GET /api/v1/products` - List products
- `GET /api/v1/products/:slug` - Get product detail
- `GET /api/v1/categories` - List categories
- `GET /api/v1/banners` - List banners
- `POST /api/v1/users/register` - Register
- `POST /api/v1/users/login` - Login
- `POST /api/v1/users/forgot-password` - Forgot password
- `POST /api/v1/users/reset-password` - Reset password
- `POST /api/v1/contact/submit` - Submit contact form

### Protected Endpoints (Require Authentication)

- `GET /api/v1/users/me` - Get current user
- `PATCH /api/v1/users/me` - Update profile
- `POST /api/v1/users/me/avatar` - Upload avatar
- `GET /api/v1/cart` - Get cart
- `POST /api/v1/cart/items` - Add to cart
- `PUT /api/v1/cart/items/:item_id` - Update cart item
- `DELETE /api/v1/cart/items/:item_id` - Delete cart item
- `GET /api/v1/checkout/init` - Initialize checkout
- `POST /api/v1/checkout/validate-shipping` - Validate shipping
- `GET /api/v1/checkout/payment-info` - Get payment info
- `POST /api/v1/checkout/place-order` - Place order
- `GET /api/v1/orders` - List orders
- `GET /api/v1/orders/:order_id` - Get order detail

### Admin Endpoints (Require Admin Role)

- `GET /api/v1/admin/dashboard/stats` - Dashboard statistics
- `GET /api/v1/admin/products` - List products (admin)
- `GET /api/v1/admin/orders` - List orders (admin)
- `GET /api/v1/admin/customers` - List customers (admin)
- `GET /api/v1/admin/settings` - Get settings
- `PUT /api/v1/admin/settings/general` - Update general settings

Xem chi tiết trong [API Documentation](./API_DOCUMENTATION.md).

## 🧪 Testing

Xem [TEST_CHECKLIST.md](./TEST_CHECKLIST.md) để biết cách test API endpoints.

## 🔒 Security

- Passwords được hash bằng SHA256 + secret
- JWT tokens với expiration
- CORS configuration
- Input validation với express-validator
- Error handling middleware

## 📄 License

ISC

## 👥 Contributors

YORI Fashion Team

---

*Last Updated: 2024*

