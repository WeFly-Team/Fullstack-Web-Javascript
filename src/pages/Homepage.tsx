import Button from '../components/Button';
import Heading from '../components/Heading';
import { useAuth } from '../customHooks/useAuth/useAuth';

const Homepage = () => {
  const { user, logout } = useAuth();
  console.log(user?.full_name);

  return (
    <>
      <Heading children="Ini Homepage" />
      {user && <p>hai {user.user_name}</p> && (
        <Button size="sm" onClick={logout}>
          Log out
        </Button>
      )}
    </>
  );
};

export default Homepage;
