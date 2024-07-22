import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: ' ',
    field: '',
    location: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    // const urlParams = new URLSearchParams();
    // const urlParams = new URLSearchParams(location.search);

    const fetchFields = async () => {
      try {
        const res = await fetch('/api/listing/fields');
        const data = await res.json();
        setFields(data);
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };
    fetchFields();

    const fetchLocations = async () => {
      try {
        const res = await fetch('/api/listing/locations');
        const data = await res.json();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className='flex flex-col md:flex-row gap-8'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-11'>
            <div className='flex items-center gap-2'>
              <label className='font-semibold text-slate-500'>
                Search Term:{' '}
              </label>
              <input
                type='text'
                id='searchTerm'
                placeholder='Search...'
                className='border bg-slate-25 rounded-lg p-3 w-full focus:customGreen focus:outline-customGreen'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='flex flex-wrap items-center gap-11 text-slate-500 bg-slate-25'>
              <div className='flex gap-3 items-center'>
                <label className='font-semibold'>Expertise:</label>
                <select
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                  className='border rounded-lg p-3 focus:outline-none focus:ring-1
                   focus:ring-customGreen custom-select w-58'>
                  <option value='' disabled>
                    Select an Expertise
                  </option>
                  {fields.map((field) => (
                    <option className='p-3' key={field} value={field}>
                      {' '}
                      {field}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex gap-3 items-center'>
                <label className='font-semibold'>Location:</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className='border rounded-lg p-3 focus:outline-none focus:ring-1
                   focus:ring-customGreen custom-select w-58'>
                  <option value='' disabled className='px-9 '>
                    Select a Location
                  </option>
                  {locations.map((location) => (
                    <option className='p-3' key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>{' '}
            </div>
          </div>

          <button className='mt-20 bg-slate-400 text-slate-200 p-3 rounded-lg mx-auto w-full uppercase hover:opacity-80'>
            {' '}
            Search
          </button>
        </form>
      </div>

      <div className=''>
        <h1 className='text-3xl font-semibold text-slate-500 border-b p-3 mt-5'>
          Listings:
        </h1>
      </div>
    </div>
  );
};

export default Search;
