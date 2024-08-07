import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Home = () => {
  SwiperCore.use([Navigation]);

  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    const fetchDistinctFieldListings = async () => {
      try {
        const res = await fetch('/api/listing/distinct');
        const data = await res.json();

        // const validListings = data.listings.filter(
        //   (listing) => listing.featuredWork && listing.featuredWork.length > 0
        // );

        setFilteredListings(data.listings);
        // setFilteredListings(validListings);
      } catch (error) {
        console.log('error fetching listing:', error.message);
      }
    };
    fetchDistinctFieldListings();
  }, []);

  console.log('filteredListings', filteredListings);
  const urls = filteredListings.map((l) => ({
    image: l.featuredWork[0],
    field: l.field,
  }));

  return (
    <div className='flex flex-col p-14 px-8 gap-6 max-w-5xl mx-auto ml-8 mt-8'>
      <div className=''>
        <h1 className='text-slate-600 font-bold text-3xl lg:text-4xl'>
          Find <span className='text-customGreen'>Local Experts </span>for Your
          Needs
        </h1>
        <br />
        <div className='text-gray-500 text-sm sm:text-lg'>
          Discover top-notch professionals right in your area with our service.
          Whether you need a skilled plumber in Brooklyn, a talented software
          developer in Manhattan, or any other expert across the Five Towns,
          Bronx, or Queens, we got you covered.
          <br />
          Our platform connects you with highly qualified professionals,
          ensuring you find the right fit for your needs quickly and easily.
          From local repairs to specialized services, explore trusted
          professionals in your neighborhood and get the job done right.
        </div>
      </div>

      {/* swiper */}
      {urls && urls.length > 0 && (
        <div>
          <Swiper
            navigation
            style={{
              '--swiper-pagination-color': '#809e88',
              '--swiper-navigation-color': '#809e88',
            }}>
            {urls.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className='relative h-[400px]'
                  style={{
                    background: `url(${url.image}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}>
                  <div
                    className='absolute left-0 right-0 text-slate-400 text-center p-2'
                    style={{
                      bottom: '10px',
                    }}>
                    {' '}
                    {url.field}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <Link
        to={'/search'}
        className='text-xl sm:text-md text-customGreen font-semibold hover:underline'>
        Let's get started...
      </Link>
    </div>
  );
};

export default Home;
