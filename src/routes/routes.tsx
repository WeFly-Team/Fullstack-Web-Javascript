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
import HistoryList from '../pages/History/History';
import MyAccout from '../pages/MyAccount/MyAccount';
import BookingDetail from '../pages/BookingDetail/BookingDetail';
import ETicket from '../pages/ETicket/ETicket';
import RegisterSuccess from '../pages/RegisterSuccess/RegisterSuccess';
import AdminLayout from '../pages/Admin/AdminLayout';

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
    path: '/register-success',
    element: <RegisterSuccess />,
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: '/order-details/:id',
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
            path: '/user/my-booking/:id',
            element: <BookingDetail />,
          },
          {
            path: '/user/my-account',
            element: <MyAccout />,
          },
          {
            path: '/user/promos',
            element: <p>Promo</p>,
          },
          {
            path: '/user/history',
            element: <HistoryList />,
          },
          {
            path: '/user/history/:id',
            element: <ETicket />,
          },
          {
            path: '/user/notification',
            element: <p>Notif</p>,
          },
        ],
      },
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            path: '/admin',
            element: <p>Report</p>,
          },
          {
            path: '/admin/flight',
            element: <p>flight</p>,
          },
          {
            path: '/admin/airport',
            element: <p>airport</p>,
          },
          {
            path: '/admin/transaction',
            element: <p>transaction</p>,
          },
        ],
      },
    ],
  },
]);

export default router;
