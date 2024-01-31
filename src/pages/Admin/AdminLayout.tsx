import { Outlet, useNavigate } from 'react-router-dom';
import NavbarAdmin from './Components/NavbarAdmin';
import SidebarAdmin from './Components/SidebarAdmin';
import { useAuth } from '../../customHooks/useAuth/useAuth';
import { useEffect } from 'react';

const AdminLayout = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAdmin != undefined) {
      if (isAdmin == false) {
        navigate('/');
      }
    }
  }, [isAdmin]);
  return (
    <div className="">
      <NavbarAdmin />
      <div className="flex flex-wrap h-screen">
        <SidebarAdmin />
        <div className="p-6 flex-1 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
