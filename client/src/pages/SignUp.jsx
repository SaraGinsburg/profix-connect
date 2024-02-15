import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='p-3 mx-auto max-w-lg'>
      <h1 className='text-3xl text-center font-semibold my-7 text-slate-500'>
        SignUp
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='rounded-lg p-3 bg-slate-500 text-white uppercase hover:opacity-80 disabled:opacity-50'>
          {loading ? 'Loading...' : 'Sign up'}
        </button>
        <div className='flex items-center'>
          <p>Have an account?</p>
          <Link to={'/sign-in'}>
            <span className='text-lime-600'>Sign in</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
