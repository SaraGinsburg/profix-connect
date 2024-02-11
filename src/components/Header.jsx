import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState([]);
  const handleSubmit = () => {};
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-lime-600'>ProFix</span>
            <span className='text-slate-500'>Connect</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='flex bg-slate-100 p-3 rounded-lg items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='  text-slate-500' />
          </button>
        </form>
        <ul className='flex gap-4 text-slate-500 '>
          <Link to='/home'>
            <li className='hidden sm:inline hover:underline'>Home</li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline hover:underline'>About</li>
          </Link>
          <Link to='/profile'>
            {/* {currentUser ? (
              <img
                src={currentUser.avatar}
                alt='profile'
                className='w-10 h-10 object-cover rounded-full'
              />
            ) : (
              <li className=' hover:underline'>Sign in</li>
            )} */}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
