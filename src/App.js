import React, { useState, useEffect } from 'react'
import './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const key = process.env.REACT_APP_API_KEY

firebase.initializeApp({
  apiKey: key,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID 
});

const auth = firebase.auth();

function App() {
  const signInWithGoogle = async () => {
    const provider = new firebase
  }
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
