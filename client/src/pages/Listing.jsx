import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          console.log('data.message', data.message);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error.message);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && (
        <p className='my-7 text-center text-2xl text-slate-600'>Loading...</p>
      )}
      {error && (
        <p className='my-7 text-center text-2xl text-orange-500'>
          Something went wrong!
        </p>
      )}
      {listing && !loading && !error && (
        <>
          <Swiper
            navigation
            style={{
              '--swiper-pagination-color': '#809e88',
              '--swiper-navigation-color': '#809e88',
            }}>
            {listing.featuredWork.map((workImg) => (
              <SwiperSlide key={workImg}>
                <div
                  className='h-[500px]'
                  style={{
                    background: `url(${workImg}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}>
                  {/* <img src={workImg} alt={listing.title} /> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
};

export default Listing;
