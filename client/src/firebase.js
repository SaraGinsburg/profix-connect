// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'profixconnect-3f2e6.firebaseapp.com',
  projectId: 'profixconnect-3f2e6',
  storageBucket: 'profixconnect-3f2e6.appspot.com',
  messagingSenderId: '200690685349',
  appId: '1:200690685349:web:4fe76a0e3a42472dec844c',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
