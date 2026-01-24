import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKoJx4AoMYj__sqhcvcNnXJF0_CLAgfk4",
  authDomain: "new-video-71a5e.firebaseapp.com",
  projectId: "new-video-71a5e",
  storageBucket: "new-video-71a5e.firebasestorage.app",
  messagingSenderId: "515413758542",
  appId: "1:515413758542:web:3a1aa9719c7be96951691f"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
