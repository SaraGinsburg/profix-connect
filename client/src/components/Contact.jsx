import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Contact = ({ listing }) => {
  const [expert, setExpert] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const { userRef } = listing;

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const res = await fetch(`/api/user/${userRef}`);
        const data = await res.json();
        setExpert(data);
      } catch (error) {
        console.error('Error fetching expert:', error.message);
      }
    };
    fetchExpert();
  }, [userRef]);

  return (
    <>
      {expert && (
        <div className='flex flex-col gap-3 mt-4'>
          <p className='text-slate-600'>
            Contact
            <span className='font-semibold mr-2 ml-2'>{expert.username}</span>
            for
            <span className='font-semibold ml-2'>{listing.name}</span>
          </p>
          <textarea
            className='w-full p-3 border border-slate-300 focus:border-slate-500 focus:outline-none rounded-lg'
            name='message'
            id='message'
            rows='2'
            value={message}
            placeholder='Enter your message here'
            onChange={handleChange}></textarea>
          <Link
            to={`mailto:${expert.email}?subject=Regarding ${
              listing.name
            }&body=${encodeURIComponent(message)}`}
            className='bg-slate-400 text-slate-200 text-center p-3 uppercase rounded-lg hover:opacity-80 hover:bg-customGreen'>
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
