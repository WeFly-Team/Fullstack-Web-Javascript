import { CSSProperties } from 'react';
import Button from '../../../../components/Button';

const HeroSection = () => {
  const style: CSSProperties = {
    backgroundImage: 'url(https://i.ibb.co/NL7CL8M/image-13.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: 'full',
    height: '678px',
  };

  return (
    <section id="hero" style={style} className="md:position-relative pb-20">
      <div className="grid grid-cols-3 md:grid-cols-8 xl:container ">
        <div className="text-white w-full sm:h-3/6 pt-10 pb-4 lg:pl-16 pl-4 pr-4 lg:mt-12 md:mt-10  col-span-3">
          <div className="md:pb-4 pb-2 flex ">
            <div className="lg:text-3xl md:text-base text-xs font-semibold lg:pr-6 pr-2">
              01
            </div>
            <div className="">
              <h2 className="lg:text-3xl md:text-base text-xs lg:pb-3 pb-1 font-semibold">
                Find Your Dream Destination
              </h2>
              <h4 className="lg:text-xl md:text-base text-xs ">
                Eu scelerisque amet amet malesuada id ultrices morbi. Vitae
                purus mauris hac nisi habitasse donec. Vitae integer massa in
                blandit.
              </h4>
            </div>
          </div>
          <div className="md:pb-4 pb-2 flex">
            <div className="lg:text-3xl md:text-base text-xs font-semibold lg:pr-6 pr-2">
              02
            </div>
            <div>
              <h2 className="lg:text-3xl md:text-base text-xs lg:pb-3 pb-1 font-semibold">
                Book Tickets Easily
              </h2>
              <h4 className="lg:text-xl md:text-base text-xs ">
                Eu sceler sque amet amet malesuada id ultrices morbi. Vitae
                purus mauris hac nisi habitasse donec. Vitae integer massa in
                blandit.
              </h4>
            </div>
          </div>
          <div className="md:pb-4 pb-2 flex ">
            <div className="lg:text-3xl md:text-base text-xs font-semibold lg:pr-6 pr-2">
              03
            </div>
            <div>
              <h2 className="lg:text-3xl md:text-base text-xs lg:pb-3 pb-1 font-semibold">
                Real-Time Flight Monitoring
              </h2>
              <h4 className="lg:text-xl md:text-base text-xs">
                Eu scelerisque amet amet malesuada id ultrices morbi. Vitae
                purus mauris hac nisi habitasse donec. Vitae integer massa in
                blandit.
              </h4>
            </div>
          </div>
        </div>
        <div className="md:position-fixed md:pt-24  pt-10 sm:pt-2 flex md:justify-center justify-end lg:justify-end  h-full sm:h-full md:h-5/6 lg:h-full col-span-1 sm:col-span-1 md:col-span-2">
          <img
            src="https://i.ibb.co/HTv63dH/Whats-App-Image-2024-01-14-at-12-25-1.png"
            className="h-3/6 sm:h-5/6 md:h-5/6 lg:h-full"
            alt=""
          />
        </div>
        <div className="w-full pr-5 pt-10 md:pt-28 lg:pt-20 md:pr-10 lg:pr-20 col-span-2 sm:col-span-2  md:col-span-3">
          <div className="md:pb-5 pb-2 ">
            <h1 className="font-semibold w-full text-white lg:text-5xl md:text-2xl text-sm text-right">
              Stay updated with travel tips, recommendations, and latest promos.
            </h1>
          </div>
          <div className="flex justify-end pl-10">
            <Button variant="primary" size="sm" id="Download">
              Download WeFly App
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
