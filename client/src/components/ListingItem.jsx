import { Link } from 'react-router-dom';

import { FaMapLocationDot } from 'react-icons/fa6';
import { ImWrench } from 'react-icons/im';
import { MdEditCalendar } from 'react-icons/md';

import { RiCoinsFill } from 'react-icons/ri';

const ListingItem = ({ listing }) => {
  return (
    <div
      className='bg-white  shadow-md hover:shadow-lg
    transition-shadow overflow-hidden rounded-lg
    w-full sm:w-[330px]'>
      {' '}
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.featuredWork[0] ||
            'https://images.unsplash.com/photo-1509395176047-4a66953fd231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGxhcHRvcHxlbnwwfHx8fDE2NTk5NDUzNzI&ixlib=rb-1.2.1&q=80&w=400'
          }
          alt='listing cover photo'
          className='h-[320px] sm:h-[220px] w-full object-cover
          hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-500'>
            {listing.name}
          </p>

          <p className='text-sm text-slate-400 line-clamp-2'>
            {listing.description}
          </p>
          <ul className='text-customDarkGreen mt-2 font-semibold text-sm flex flex-wrap items-center gap-1  sm:gap-4'>
            <li className='flex gap-1 items-center whitespace-nowrap '>
              <FaMapLocationDot className='text-lg text-customGreen' />
              <span className='text-slate-500'>Serving:</span>
              {listing.locationServed.map((l, index) => (
                <p key={index} className='text-slate-400 text-xs'>
                  {l}
                  {index < listing.locationServed.length - 1 && ','}
                </p>
              ))}
            </li>

            <li className='flex gap-1 items-center whitespace-nowrap '>
              <MdEditCalendar className='text-lg text-customGreen' />
              <span className='text-slate-500'>Years of Expertise:</span>
              <p className='text-slate-400 text-xs'>
                {listing.yearsInBusiness}
              </p>
            </li>
          </ul>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
