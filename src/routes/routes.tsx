import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ForgotPass from '../pages/ForgotPass/ForgotPass';
import SetNewPass from '../pages/ForgotPass/SetNewPass';
import DonePage from '../pages/ForgotPass/DonePage';
import PageOTP from '../pages/ForgotPass/PageOTP';

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
    path: '/reset-password',
    element: <SetNewPass />,
  },
  {
    path: '/done',
    element: <DonePage />,
  },
  {
    path: '/otp',
    element: <PageOTP />,
  },
]);

export default router;
