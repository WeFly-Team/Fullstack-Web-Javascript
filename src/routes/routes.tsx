import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ForgotPass from '../pages/ForgotPass/ForgotPass';
import PrivateRoutes from '../utils/PrivateRoutes';

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
    element: <PrivateRoutes />,
    children: [
      // {
      //   path:'/exampleProtectedRoute',
      //   element:<ProtectedPage/>
      // }
    ],
  },
]);

export default router;
