import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDAttZWYHt45dANT71tXc4LiJxZLia47HY",
  authDomain: "task-manager-c3a97.firebaseapp.com",
  projectId: "task-manager-c3a97",
  storageBucket: "task-manager-c3a97.firebasestorage.app",
  messagingSenderId: "510346916344",
  appId: "1:510346916344:web:558cd8062d22382cdea60d",
  measurementId: "G-K6VYXVJMKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Use emulator in development if needed
if (process.env.NODE_ENV === 'development') {
  // Uncomment the next line if you want to use Firestore emulator
  // connectFirestoreEmulator(db, 'localhost', 8080);
}

export { db };
export default app; 