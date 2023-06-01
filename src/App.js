import React, {FC, useEffect} from 'react';
import { AppRoutes } from './routing/routes';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo4DzDYh59P-ugwFHy8ai6GczFX0Gh1v4",
  authDomain: "accidentpronelocation.firebaseapp.com",
  projectId: "accidentpronelocation",
  storageBucket: "accidentpronelocation.appspot.com",
  messagingSenderId: "1045136166697",
  appId: "1:1045136166697:web:58c5bd8005ad8062b37138",
  measurementId: "G-PNYRC173DB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

const App = (props) => {

    return (
        <div>
            <AppRoutes/>
        </div>
    );

}



export default App;
