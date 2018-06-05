import * as firebase from "firebase";

var config = {
    authDomain: process.env.FIREBASE_AUTH_DOMAINL,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };
  
  firebase.initializeApp(config);

  const database = firebase.database();

export {firebase, database as default};