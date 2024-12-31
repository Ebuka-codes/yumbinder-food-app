// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD5JI0N8yrWOUJRhk5H0Diu1kFwHDLChRg',
  authDomain: 'yumbinder.firebaseapp.com',
  projectId: 'yumbinder',
  storageBucket: 'yumbinder.firebasestorage.app',
  messagingSenderId: '993717340512',
  appId: '1:993717340512:web:7e6a2a3d7e712eb391b605',
  measurementId: 'G-DJ9490DCT3',
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
