import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [fields, setFields] = useState([]);
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  console.log(listings);
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSearchTerm(urlParams.get('searchTerm') || '');
    setSelectedField(urlParams.get('field') || '');
    setSelectedLocation(urlParams.get('location') || '');

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      try {
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        const listingsData = Array.isArray(data.listings) ? data.listings : [];
        setListings(listingsData);
        setShowMore(listingsData.length > 8);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setListings([]);
      }
      setLoading(false);
    };

    fetchListings();
  }, [window.location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', searchTerm || '');
    urlParams.set('field', selectedField || '');
    urlParams.set('location', selectedLocation || '');
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const urlParams = new URLSearchParams(location.search);
    const startIndex = listings.length;
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    setShowMore(data.listings.length > 8);
    setListings([...listings, ...data.listings]);
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
                  value={selectedField || ''}
                  onChange={(e) => setSelectedField(e.target.value)}
                  className='border rounded-lg p-3 focus:outline-none focus:ring-1
                   focus:ring-customGreen custom-select w-58'>
                  <option value=''>All Professions</option>
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
                  value={selectedLocation || ''}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className='border rounded-lg p-3 focus:outline-none focus:ring-1
                   focus:ring-customGreen custom-select w-58'>
                  <option value='' className='px-9 '>
                    All Locations
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

      <div className='flex-1'>
        <h1 className='text-3xl font-semibold text-slate-500 border-b p-3 mt-5'>
          Listings:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-500'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-500 text-center w-full'>
              loading...
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-customGreen hover:underline p-7 text-left w-full'>
              show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
