import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  //  firebase storage
  //  allow read;
  //  allow write: if
  //  request.resource.size < 2 * 1024 * 1024 &&
  //  request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 text-slate-500'>
        profile
      </h1>
      <form className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-orange-400'>
              Error Image Upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-500'>{`Uploading ${filePerc}`}</span>
          ) : filePerc === 100 ? (
            <span className='text-customGreen'>
              Image successfully uploaded!
            </span>
          ) : (
            ''
          )}
        </p>

        <input
          type='text'
          placeholder='username'
          id='username'
          className='border p-3 rounded-lg'
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg'
        />
        <input
          type='text'
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg'
        />
        <button
          // disabled={loading}
          className='rounded-lg p-3 bg-slate-500 text-white uppercase
          hover:opacity-80 disabled:opacity-50'>
          update
          {/* {loading ? 'Loading...' : 'Update'} */}
        </button>
      </form>
      <div className='flex justify-between mt-3'>
        <span className='text-orange-400'>Delete account</span>
        <span className='text-orange-400'>Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
