import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { IJwtPayload, IUser } from './types';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decode = jwtDecode(token) as IJwtPayload;

      if (decode.exp && decode.exp * 1000 < Date.now()) {
        logout();
      } else {
        setIsAuthenticated(true);
        const authUser: IUser = {
          fullname: decode.fullname,
          email: decode.email,
        };
        setUser(authUser);
      }
    }
  }, []);

  const login = (token: string) => {
    verifyToken(token);
  };

  const verifyToken = (token: string) => {
    const decode = jwtDecode(token) as IJwtPayload;

    if (decode.exp * 1000 < Date.now()) {
      logout();
      return;
    }
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    const authUser: IUser = {
      fullname: decode.fullname,
      email: decode.email,
    };
    setUser(authUser);
    navigate('/');
  };
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return { isAuthenticated, user, login, logout, verifyToken };
};
