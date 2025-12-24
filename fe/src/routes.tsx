import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

// Lazy load pages
const Home = lazy(() => import('@/pages/Home'))
const Login = lazy(() => import('@/pages/Login'))
const Signup = lazy(() => import('@/pages/Signup'))
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'))
const ResetPassword = lazy(() => import('@/pages/ResetPassword'))
const Products = lazy(() => import('@/pages/Products'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const Categories = lazy(() => import('@/pages/Categories'))
const Search = lazy(() => import('@/pages/Search'))
const Cart = lazy(() => import('@/pages/Cart'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const Payment = lazy(() => import('@/pages/Payment'))
const Orders = lazy(() => import('@/pages/Orders'))
const OrderDetail = lazy(() => import('@/pages/OrderDetail'))
const OrderSuccess = lazy(() => import('@/pages/OrderSuccess'))
const Profile = lazy(() => import('@/pages/Profile'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const Terms = lazy(() => import('@/pages/Terms'))
const SizeGuide = lazy(() => import('@/pages/SizeGuide'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Admin pages
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'))
const AdminProducts = lazy(() => import('@/pages/admin/Products'))
const AdminOrders = lazy(() => import('@/pages/admin/Orders'))
const AdminCustomers = lazy(() => import('@/pages/admin/Customers'))
const AdminSettings = lazy(() => import('@/pages/admin/Settings'))

// Route definitions
export const routes: RouteObject[] = [
  // Public routes
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/products',
    element: <Products />,
  },
  {
    path: '/products/:slug',
    element: <ProductDetail />,
  },
  {
    path: '/categories',
    element: <Categories />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '/size-guide',
    element: <SizeGuide />,
  },
  // Protected routes (cần authentication)
  {
    path: '/cart',
    element: <Cart />,
    // TODO: Wrap with PrivateRoute
  },
  {
    path: '/checkout',
    element: <Checkout />,
    // TODO: Wrap with PrivateRoute
  },
  {
    path: '/checkout/payment',
    element: <Payment />,
    // TODO: Wrap with PrivateRoute
  },
  {
    path: '/orders',
    element: <Orders />,
    // TODO: Wrap with PrivateRoute
  },
  {
    path: '/orders/:orderId',
    element: <OrderDetail />,
    // TODO: Wrap with PrivateRoute
  },
  {
    path: '/orders/:orderId/success',
    element: <OrderSuccess />,
    // TODO: Wrap with PrivateRoute
  },
  {
    path: '/profile',
    element: <Profile />,
    // TODO: Wrap with PrivateRoute
  },
  // Admin routes (cần authentication + admin role)
  {
    path: '/admin',
    element: <AdminDashboard />,
    // TODO: Wrap with AdminRoute
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />,
    // TODO: Wrap with AdminRoute
  },
  {
    path: '/admin/products',
    element: <AdminProducts />,
    // TODO: Wrap with AdminRoute
  },
  {
    path: '/admin/orders',
    element: <AdminOrders />,
    // TODO: Wrap with AdminRoute
  },
  {
    path: '/admin/customers',
    element: <AdminCustomers />,
    // TODO: Wrap with AdminRoute
  },
  {
    path: '/admin/settings',
    element: <AdminSettings />,
    // TODO: Wrap with AdminRoute
  },
  // 404 Not Found
  {
    path: '*',
    element: <NotFound />,
  },
]

