import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './Component/Navbar'
import NewsLetter from './Component/NewsLetter'
import Footer from './Component/Footer'
import AboutUs from './Component/AboutUs'
import Contact from './Component/Contact'

import { ToastContainer, toast } from 'react-toastify';

import { Outlet } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './Home/HomePage'
import Error404 from './Component/Error404'
import Collections from './Products/Collections'
import ViewProduct from './Products/ViewProduct'
import AuthForm from './Auth/AuthForm'
import ProfilePage from './Auth/ProfilePage'
import CartPage from './Products/CartPage'
import MyOrders from './Products/MyOrders'
import AdminLogin from './Auth/AdminLogin'
import AdminDashboard from './Auth/AdminDashboard'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "collections", element: <> <Collections /> </> },
      { path: "about", element: <AboutUs /> },
      { path: "contact", element: <Contact /> },
      { path: "view-product/:id", element: <ViewProduct /> },
      { path: "login", element: <AuthForm /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "cart", element: <CartPage /> },
      { path: "my-orders", element: <MyOrders /> },

    ],
  },
  {
    path: "/admin-login",
    element: <AdminLogin />
  },
  {
    path: "/admin",
    element: <AdminDashboard />
  },
  {
    path: "/*",
    element: <Error404 />
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)



function Layout() {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">
        <Outlet />
      </main>
      <NewsLetter />
      <Footer />
      <ToastContainer />
    </>
  );
}