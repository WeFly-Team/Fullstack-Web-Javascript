import Button from '../components/Button';
import Heading from '../components/Heading';
import { useAuth } from '../customHooks/useAuth/useAuth';

const Homepage = () => {
  const { user, logout } = useAuth();
  console.log(user);

  return (
    <>
      <Heading children="Ini Homepage" />
      {user?.email && <p>hai {user?.email}</p>}
      <Button size="sm" onClick={logout}>
        Log out
      </Button>
    </>
  );
};

export default Homepage;
