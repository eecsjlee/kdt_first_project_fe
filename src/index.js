import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import About from './pages/About';
import ProtectedRoute from './pages/ProtectedRoute';
import GuestBook from './pages/GuestBook';
import WriteBoard from './pages/WriteBoard';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MyPage from './pages/MyPage';
import BoardList from './pages/BoardList';

const queryClient = new QueryClient();

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
    {/* QueryClientProvider로 앱 전체를 감쌈 */}
    <QueryClientProvider client={queryClient}>
      {/* RouterProvider로 라우팅 설정 */}
      <RouterProvider router={router} />
      {/* React Query Devtools 추가 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);