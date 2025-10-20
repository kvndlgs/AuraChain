// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKFDnHfzgzsJsAf9icKGby7fsw5hhPCFI",
  authDomain: "aurachain-de2b1.firebaseapp.com",
  projectId: "aurachain-de2b1",
  storageBucket: "aurachain-de2b1.firebasestorage.app",
  messagingSenderId: "190142112947",
  appId: "1:190142112947:web:e402d5f5c823067d30bcc6",
  measurementId: "G-HPX0VTW1Z4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);