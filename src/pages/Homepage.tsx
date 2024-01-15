import { googleLogout } from '@react-oauth/google';
import Button from '../components/Button';
import Heading from '../components/Heading';
import { useAuth } from '../customHooks/useAuth/useAuth';

const Homepage = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    googleLogout();
    logout();
  };

  return (
    <>
      <Heading children="Ini Homepage" />
      {user && (
        <div>
          <p>hai {user.full_name}</p>
          <Button size="sm" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      )}
    </>
  );
};

export default Homepage;
