// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD-OUEUwDMaSXYkPsbuyVkFavHkcxlflSc",
  authDomain: "gourmex-ca137.firebaseapp.com",
  projectId: "gourmex-ca137",
  storageBucket: "gourmex-ca137.firebasestorage.app",
  messagingSenderId: "570650001361",
  appId: "570650001361",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default firebaseConfig; 