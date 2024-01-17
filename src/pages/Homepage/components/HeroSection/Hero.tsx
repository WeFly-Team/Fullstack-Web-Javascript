import Button from '../../../../components/Button';
import '../../../../index.css';




const HeroSection = () => {

    const style = {
        backgroundImage: 'url(https://i.ibb.co/NL7CL8M/image-13.png)',
        bckgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: 'full',
        height: '720px'
    }

    return (
      <section id="hero" style={style} className=''>
        <div  className='grid lg:grid-cols-8 xl:container'>
            <div className='text-white pl-16 pt-20 col-span-3'>
                <div className='pb-4 flex '>
                    <div className="text-3xl font-semibold pr-6">01</div>
                    <div className="">
                        <h2 className='text-3xl pb-3 font-semibold'>Find Your Dream Destination</h2>
                        <h4 className='text-xl'>Eu scelerisque amet amet malesuada id ultrices morbi. Vitae purus mauris hac nisi habitasse donec. Vitae integer massa in blandit.</h4>
                    </div>
                </div>
                <div className='pb-4 flex'>
                    <div className="text-3xl font-semibold pr-6">02</div>
                    <div>
                        <h2 className='text-3xl pb-3 font-semibold'>Book Tickets Easily</h2>
                        <h4 className='text-xl'>Eu scelerisque amet amet malesuada id ultrices morbi. Vitae purus mauris hac nisi habitasse donec. Vitae integer massa in blandit.</h4>
                    </div>
                </div>
                <div className='pb-4 flex '>
                    <div className='text-3xl font-semibold pr-6'>03</div>
                    <div>
                        <h2 className='text-3xl pb-3 font-semibold'>Real-Time Flight Monitoring</h2>
                        <h4 className='text-xl'>Eu scelerisque amet amet malesuada id ultrices morbi. Vitae purus mauris hac nisi habitasse donec. Vitae integer massa in blandit.</h4>
                    </div>
                </div>
            </div>
            <div className='pt-28 flex justify-end col-span-2'>
        <img src="https://i.ibb.co/HTv63dH/Whats-App-Image-2024-01-14-at-12-25-1.png"  alt="" />
            </div>
            <div className='pt-20 w-full pr-20 col-span-3'>
                <div className='pb-5'>
                    <h1 className='font-semibold text-white text-5xl text-right'>Stay updated with travel tips, recommendations, and latest promos.</h1>
                </div>
                <div className='flex justify-end'>
                    <Button variant="primary" size="md" id="Download">
                    Download WeFly App
                    </Button>
                </div>
            </div>
        </div>
      </section>
    )
  }
  
  export default HeroSection;