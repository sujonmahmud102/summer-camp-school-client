// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0pb17DvGQXRWcdl3CX0wft-w1kY4nZSk",
    authDomain: "summer-camp-3f733.firebaseapp.com",
    projectId: "summer-camp-3f733",
    storageBucket: "summer-camp-3f733.appspot.com",
    messagingSenderId: "320297489328",
    appId: "1:320297489328:web:2360f85d32770785de7c75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;