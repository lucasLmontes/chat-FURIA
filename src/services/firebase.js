import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA9weakwTso7CZdJvAjonPXVHmxueg6nqo",
  authDomain: "chat-da-furia.firebaseapp.com",
  projectId: "chat-da-furia",
  storageBucket: "chat-da-furia.firebasestorage.app",
  messagingSenderId: "310931564926",
  appId: "1:310931564926:web:beb21c368eec63a58deb2f",
  measurementId: "G-9B5YVSKFZC"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);