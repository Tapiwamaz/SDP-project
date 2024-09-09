const { initializeApp } = require("firebase/app");
const {getFirestore}  = require("firebase/firestore")

// Initialize Firebase using environment variables from github secrets
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIRESTORE_API_KEY,
    authDomain: process.env.REACT_APP_FIRESTORE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIRESTORE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIRESTORE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIRESTORE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIRESTORE_APP_ID,
    measurementId: process.env.REACT_APP_FIRESTORE_MEASUREMENT_ID,
};

// create connection to firebase web app
const app = initializeApp(firebaseConfig);
// get the database from the firebase web app
const db = getFirestore(app);
// export the db to functions
module.exports = { db };
