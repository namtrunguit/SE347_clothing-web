# YORI Fashion - Frontend

Frontend React application cho YORI Fashion e-commerce platform.

## Tech Stack

- **React 18** với TypeScript
- **Vite** - Build tool
- **React Router v6** - Routing
- **TailwindCSS** - Styling
- **Axios** - HTTP client
- **React Hook Form** + **Zod** - Form handling & validation

## Setup

1. Cài đặt dependencies:
```bash
npm install
```

2. Tạo file `.env` (đã có `.env.example`):
```bash
cp .env.example .env
```

3. Chạy development server:
```bash
npm run dev
```

4. Build production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/     # Reusable components
│   ├── common/    # Header, Footer, Button, etc.
│   ├── product/   # ProductCard, ProductList, etc.
│   ├── cart/      # CartItem, CartSummary
│   ├── checkout/  # CheckoutForm, AddressForm
│   └── admin/     # Admin components
├── pages/         # Page components
├── hooks/         # Custom hooks
├── services/      # API services
├── contexts/      # React Context
├── types/         # TypeScript types
└── utils/         # Utility functions
```

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:5000/api/v1)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

