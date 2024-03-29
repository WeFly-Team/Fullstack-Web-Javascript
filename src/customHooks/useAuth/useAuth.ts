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
        setIsAuthenticated(true);
        decodeToken(decode);
      }
    }
  }, []);

  const decodeToken = (decode: IJwtPayload) => {
    const authUser: IUser = {
      full_name: decode.full_name,
      user_name: decode.user_name,
      authorities: decode.authorities,
      phone_number: decode.phone_number,
      date_of_birth: decode.date_of_birth,
    };

    generateUser(authUser);
  };

  const generateUser = (authUser: IUser) => {
    setUser(authUser);
    return authUser;
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
    const authUser = generateUser(decode);
    if (authUser.authorities) {
      authUser.authorities.forEach((role) => {
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

  return {
    isAuthenticated,
    isAdmin,
    user,
    login,
    logout,
    verifyToken,
    generateUser,
  };
};
