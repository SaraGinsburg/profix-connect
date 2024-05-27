import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from 'firebase/storage';
import { app } from '../firebase';

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    field: '',
    description: '',
    featuredWork: [],
    initialServiceCall: 0,
    locationServed: [],
    backgroundChecked: false,
    numberOfEmployees: 0,
    yearsInBusiness: 0,
  });
  const [imageUploadError, setImageUploadError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevState) => ({ ...prevState, [id]: checked }));
    } else {
      setFormData((prevState) => ({ ...prevState, [id]: value }));
    }
  };

  const handleImagesSubmit = (e) => {
    if (files.length === 0) {
      setImageUploadError('No images selected');
      return;
    }

    if (files.length > 0 && files.length + formData.featuredWork.length < 11) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData((prevState) => ({
            ...prevState,
            featuredWork: prevState.featuredWork.concat(urls),
          }));
          setImageUploadError('');
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can upload only 10 images of featured work');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (idx) => {
    setFormData((prevState) => ({
      ...prevState,
      featuredWork: prevState.featuredWork.filter((_, i) => i !== idx),
    }));
    console.log('formData', formData);
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-center my-7 text-3xl font-semibold text-slate-500'>
        Create a Listing
      </h1>
      <form className='mx-3 flex flex-col sm:flex-row     gap-10 md:justify-between'>
        <div className='flex flex-col  gap-2 flex-1'>
          <div className='flex'>
            <input
              type='text'
              placeholder='Name'
              className='focus:outline-none border p-3 rounded-lg flex-grow mr-2 w-3/4'
              id='name'
              maxLength='100'
              minLength='10'
              required
              onChange={handleChange}
              // value={formData.name}
            />
            <input
              type='text'
              placeholder='Field of expertise'
              className='focus:outline-none border p-3 rounded-lg w-1/4'
              id='field'
              maxLength='50'
              minLength='10'
              required
              onChange={handleChange}
              // value={formData.field}
            />
          </div>

          <textarea
            type='text'
            placeholder='Description'
            className='focus:outline-none border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            // value={formData.description}
          />

          <div className='flex mx-3 my-4 gap-6 flex-wrap'>
            <div className='flex gap-2  items-center'>
              <input
                type='number'
                required
                id='initialServiceCall'
                min='0'
                max='300'
                className=' accent-customGreen w-15 focus:outline-none border text-right border-customGreen text-slate-500 rounded-lg'
              />
              <span className='text-sm text-slate-400'>$/service call</span>
            </div>
            <div className='flex gap-2  items-center'>
              <input
                type='number'
                required
                id='yearsInBusiness'
                min='0'
                max='30'
                // default='0'
                className=' accent-customGreen w-15 focus:outline-none border text-right border-customGreen text-slate-500 rounded-lg'
              />
              <span className='text-sm text-slate-400'>years in business</span>
            </div>
            <div className='flex gap-2  items-center'>
              <select
                id='locationServed'
                multiple
                required
                className='accent-customGreen border p-2 rounded-lg w-full focus:outline-none border-customGreen text-slate-500 h-48'>
                <option value='Brooklyn'>Brooklyn</option>
                <option value='Manhattan'>Manhattan</option>
                <option value='Queens'>Queens</option>
                <option value='Bronx'>Bronx</option>
                <option value='5Towns'>5 Towns</option>
              </select>
              <span className='text-sm text-slate-400'>locations served</span>
            </div>
          </div>
          <div className='flex mx-3 my-1 gap-6 flex-wrap'>
            <div className='flex gap-2  items-center'>
              <input
                type='number'
                required
                id='numberOfEmployees'
                min='1'
                max='100'
                className=' accent-customGreen w-15 focus:outline-none border text-right border-customGreen text-slate-500 rounded-lg'
              />
              <span className='text-sm text-slate-400'>
                number of employees
              </span>
            </div>
            <div className='flex gap-2 mx-3 items-center'>
              <input
                type='checkbox'
                id='backgroundChecked'
                className=' accent-customGreen w-4 focus:outline-none border
                 p-3   rounded-lg'
              />
              <span className='text-sm text-slate-400'>
                employees background checked
              </span>
            </div>
          </div>
        </div>

        <div className='flex flex-col flex-1 gap-4 mx-10'>
          <p className=' font-semibold text-slate-500'>Featured Projects:</p>
          <div className=' flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-customGreen  rounded-lg
               w-full text-slate-500'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImagesSubmit}
              className='p-3 text-customGreen border border-customGreen
              rounded-lg uppercase hover:shadow-lg disabled:opacity-70'>
              {uploading ? 'uploading...' : 'upload'}
            </button>
          </div>
          <p className='text-orange-500 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.featuredWork.length > 0 &&
            formData.featuredWork.map((url, idx) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'>
                <img
                  src={url}
                  alt='featured work image'
                  className='w-40 h-40 object-cover rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(idx)}
                  className='p-3 text-orange-500 text-sm rounded-lg uppercase hover:opacity-60'>
                  Delete
                </button>
              </div>
            ))}
          <button className=' rounded-lg p-3 bg-slate-500 text-white uppercase hover:opacity-80 disabled:opacity-50'>
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
