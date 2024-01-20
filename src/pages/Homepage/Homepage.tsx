import FindTicket from './components/FindTicket/FindTicket';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/Hero';

const Homepage = () => {
  return (
    <>
      <Navbar className="fixed top-0 right-0 left-0 z-10" />
      <FindTicket />
      <HeroSection />
      <Footer />
    </>
  );
};

export default Homepage;
