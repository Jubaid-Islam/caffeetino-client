import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './components/Home/Home.jsx'
import AddCoffee from './components/AddCoffee.jsx'
import UpdateCoffee from './components/UpdateCoffee.jsx'
import CoffeeDetails from './components/CoffeeDetails.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import CartProvider from './contexts/CartProvider.jsx'
import axios from 'axios'
import MyCoffees from './components/MyCoffees.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import MyOrders from './components/MyOrders.jsx'
import AllCoffees from './components/AllCoffees.jsx'
import AddToCartPage from './components/AddToCartPage.jsx'
import Checkout from './components/Checkout/Checkout.jsx'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        loader: () => axios(`${import.meta.env.VITE_URL}/coffees`),
        Component: Home,
      },
      {
        path: 'addCoffee',
        element: <PrivateRoute> <AddCoffee /> </PrivateRoute>
      },
      {
        path: 'addToCartPage',
        element: <PrivateRoute> <AddToCartPage /> </PrivateRoute>
      },
      {
        path: 'allCoffees',
        loader: () => axios(`${import.meta.env.VITE_URL}/coffees`),
        element: <PrivateRoute> <AllCoffees /> </PrivateRoute>
      },
      {
        path: 'coffee/:id',
        loader: ({ params }) => axios(`${import.meta.env.VITE_URL}/coffee/${params.id}`),
        element: <PrivateRoute> <CoffeeDetails /> </PrivateRoute>
      },
      {
        path: 'updateCoffee/:id',
        element: <PrivateRoute> <UpdateCoffee /> </PrivateRoute>
      },
      {
        path: 'signin',
        Component: SignIn,
      },
      {
        path: 'signup',
        Component: SignUp,
      },
      {
        path: 'myCoffees/:email',
        loader: ({ params }) => axios(`${import.meta.env.VITE_URL}/myCoffees/${params.email}`),
        element: <PrivateRoute> <MyCoffees /> </PrivateRoute>
      },
      {
        path: 'myOrders',
        element: <PrivateRoute> <MyOrders /> </PrivateRoute>
      },
      {
        path: 'checkout',
        element: <PrivateRoute> <Checkout /></PrivateRoute>
      },
    ],
  },
])

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </Elements>
  </StrictMode>
)
