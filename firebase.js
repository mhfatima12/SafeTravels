import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDBaQP14d672vvnmB9915f6PfUgEfn4WPc",
  authDomain: "savetravels-c191a.firebaseapp.com",
  projectId: "savetravels-c191a",
  storageBucket: "savetravels-c191a.firebasestorage.app",
  messagingSenderId: "279694941384",
  appId: "1:279694941384:web:6dd580b4ab23c6e176d9fd",
  measurementId: "G-RT5PRRHNJS"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
