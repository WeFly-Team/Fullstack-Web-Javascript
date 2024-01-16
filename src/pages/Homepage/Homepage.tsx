import { googleLogout } from '@react-oauth/google';
import Button from '../../components/Button';
import Heading from '../../components/Heading';
import { useAuth } from '../../customHooks/useAuth/useAuth';
import Navbar from './components/Navbar';

const Homepage = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    googleLogout();
    logout();
  };

  return (
    <>
      <Navbar />
      {/* <Heading children="Ini Homepage" />
      {user && (
        <div>
          <p>hai {user.full_name}</p>
          <Button size="sm" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      )} */}
    </>
  );
};

export default Homepage;
