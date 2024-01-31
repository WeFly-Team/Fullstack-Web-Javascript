import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { IJwtPayload, IUser } from './types';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decode = jwtDecode(token) as IJwtPayload;

      if (decode.exp && decode.exp * 1000 < Date.now()) {
        logout();
      } else {
        generateUser(decode);
      }
    }
  }, []);

  const generateUser = (decode: IJwtPayload) => {
    setIsAuthenticated(true);
    const authUser: IUser = {
      full_name: decode.full_name,
      user_name: decode.user_name,
      authorities: decode.authorities,
    };
    setUser(authUser);
  };

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
    generateUser(decode);
    if (user?.authorities) {
      user.authorities.forEach((role) => {
        if (role == 'ROLE_ADMIN') {
          setIsAdmin(true);
          navigate('/admin');
          return;
        } else if (role == 'ROLE_USER') {
          setIsAdmin(false);
          navigate('/');
        }
      });
    }
  };
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return { isAuthenticated, isAdmin, user, login, logout, verifyToken };
};
