import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAA5Y7CDg5ciVp__b-3sTUF4Zd5J_1f3S8",
  authDomain: "dormlitgrow.firebaseapp.com",
  projectId: "dormlitgrow",
  storageBucket: "dormlitgrow.firebasestorage.app",
  messagingSenderId: "239093330641",
  appId: "1:239093330641:web:96a28595c13ba4f05e8bf0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app; 