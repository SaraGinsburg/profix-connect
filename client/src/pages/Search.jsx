import { useState, useEffect } from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
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

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form>
          <div className='flex items-center gap-2'>
            <label className='text-slate-600'>Search Term: </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border bg-slate-25 rounded-lg p-3 w-full focus:customGreen focus:outline-customGreen'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='flex items-center gap-4 text-slate-500 bg-slate-25'>
            <label className='font-semibold'>Expertise:</label>
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className='border rounded-lg p-3 focus:outline-none focus:ring-1
              focus:ring-customGreen custom-select'>
              <option value='' disabled>
                Select an Expertise
              </option>
              {fields.map((field) => (
                <option className='p-3' key={field}>
                  {' '}
                  {field}
                </option>
              ))}
            </select>

            <label className='font-semibold'>Location:</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className='border rounded-lg p-3 focus:outline-none focus:ring-1
              focus:ring-customGreen custom-select'>
              <option value='' disabled>
                Select a Location
              </option>
              {locations.map((location) => (
                <option className='p-3' key={location}>
                  {' '}
                  {location}
                </option>
              ))}
            </select>
          </div>

          <button className='bg-slate-500 text-slate-200 p-3 rounded-lg uppercase hover:opacity-80'>
            {' '}
            Search
          </button>
        </form>
      </div>

      <div className=''>
        <h1>listing results:</h1>
      </div>
    </div>
  );
};

export default Search;
