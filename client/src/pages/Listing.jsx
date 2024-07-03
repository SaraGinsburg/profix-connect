import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaMapMarkerAlt, FaShare } from 'react-icons/fa';
import { FaDollarSign } from 'react-icons/fa6';
import { FaMapLocationDot } from 'react-icons/fa6';
import { ImWrench } from 'react-icons/im';
import { MdEditCalendar } from 'react-icons/md';
import { IoMdContacts } from 'react-icons/io';
import { FaRegAddressBook } from 'react-icons/fa';
import { RiCoinsLine } from 'react-icons/ri';
//<FaDollarSign /> <IoMdContacts />  <FaMapLocationDot /> <RiCoinsLine /><ImWrench /> <MdEditCalendar />
// <FaRegAddressBook />
const Listing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

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
        <div>
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
          <div
            className='fixed top-[13%]
                          right-[3%] z-10 border rounded-full w-10 h-10 flex
                          justify-center items-center bg-slate-200
                         cursor-pointer'>
            <FaShare
              className='text-customGreen'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setLinkCopied(true);
                setTimeout(() => setLinkCopied(false), 2000);
              }}
            />
          </div>
          {linkCopied && (
            <p className='text-customGreen fixed top-[18%] right-[1%] z-10'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold text-slate-600'>
              {listing.name} -{listing.field}
            </p>
            <p className='flex items-center gap-2 mt-4 text-slate-600 text-sm '>
              <FaMapMarkerAlt className=' text-customGreen' />
              {listing.address}
            </p>

            <p className='text-slate-600'>
              <span className='font-semibold text-slate-800'>
                Description -{' '}
              </span>
              {listing.description}
            </p>
            <ul className='text-customDarkGreen font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex gap-1 items-center whitespace-nowrap '>
                <RiCoinsLine className='text-lg text-customGreen' />
                <p className='text-slate-500 text-xs'>
                  {listing.initialServiceCall > 0
                    ? `$ ${listing.initialServiceCall} initial service call`
                    : 'no initial fee'}
                </p>
              </li>
              <li className='flex gap-1 items-center whitespace-nowrap '>
                <FaMapLocationDot className='text-lg text-customGreen' />
                <span className='text-slate-600'>Serving:</span>
                {listing.locationServed.map((l, index) => (
                  <p key={index} className='text-slate-500 text-xs'>
                    {l}
                    {index < listing.locationServed.length - 1 && ','}
                  </p>
                ))}
              </li>
              {/* <li className='flex gap-1 items-center whitespace-nowrap '>
                <FaParking className='text-lg text-customGreen' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex gap-1 items-center whitespace-nowrap '>
                <FaChair className='text-lg text-customGreen' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li> */}
            </ul>
            {/* {currentUser && currentUser._id !== listing.userRef && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-400 text-slate-200 w-full max-w-[417px] text-center rounded-lg uppercase hover:opacity-80 p-2'>
                Contact Landlord
              </button>
            )} */}
            {/* {contact && <Contact listing={listing} />} */}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
