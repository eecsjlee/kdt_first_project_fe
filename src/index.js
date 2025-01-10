import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import About from './pages/About';
import GuestBook from './pages/GuestBook';
import WriteBoard from './pages/WriteBoard';
import MyPage from './pages/MyPage';
import BoardList from './pages/BoardList';

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
        path: '/write',
        element: <WriteBoard />,
      },
      {
        path: '/list',
        element: <BoardList />,
      },
      {
        path: '/mypage',
        element: <MyPage />
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