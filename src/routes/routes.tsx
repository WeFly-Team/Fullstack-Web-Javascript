import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../pages/Homepage/Homepage';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ForgotPass from '../pages/ForgotPass/ForgotPass';
import PrivateRoutes from '../utils/PrivateRoutes';
import FlightList from '../pages/FlightList/FlightList';
import OrderDetails from '../pages/OrderDetails/OrderDetails';
import MyBooking from '../pages/MyBooking/MyBooking';
import ProfileLayout from '../pages/ProfileLayout/ProfileLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPass />,
  },
  {
    path: '/flight-list',
    element: <FlightList />,
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: '/order-details',
        element: <OrderDetails />,
      },
      {
        path: '/user',
        element: <ProfileLayout />,
        children: [
          {
            path: '/user/my-booking',
            element: <MyBooking />,
          },
          {
            path: '/user/my-account',
            element: <p>Account</p>,
          },
          {
            path: '/user/promos',
            element: <p>Promo</p>,
          },
          {
            path: '/user/history',
            element: <p>History</p>,
          },
          {
            path: '/user/notification',
            element: <p>Notif</p>,
          },
        ],
      },
    ],
  },
]);

export default router;
