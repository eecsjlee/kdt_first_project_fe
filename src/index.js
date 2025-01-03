import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import About from './pages/About';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import NewProduct from './pages/NewProduct';
import MyCart from './pages/MyCart';
import ProtectedRoute from './pages/ProtectedRoute';
import GuestBook from './pages/GuestBook';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, 
        path: '/', 
        element: <Home /> 
      },
      { 
        path: '/about', 
        element: <About /> 
      },
      { 
        path: '/guestbook', 
        element: <GuestBook /> 
      },
      { 
        path: '/products', 
        element: <AllProducts /> 
      },
      {
        path: '/products/new',
        element: <NewProduct />,
      },
      {
        path: '/product/:id',
        element: <ProductDetail />,
      },
      {
        path: '/carts',
        element: <MyCart />
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);