import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBYbPGuT2ggX-OWreihKpyl88m8k5aW6hU",
    authDomain: "kirocord-7e034.firebaseapp.com",
    projectId: "kirocord-7e034",
    storageBucket: "kirocord-7e034.appspot.com",
    messagingSenderId: "913339050640",
    appId: "1:913339050640:web:f39183972f5f7318250615",
    measurementId: "G-R6KWV1MR50"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;