// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyActX_ebI4ZjgoStXJNx929ZnxEV6lt6h0",
  authDomain: "login-app-be3df.firebaseapp.com",
  projectId: "login-app-be3df",
  storageBucket: "login-app-be3df.appspot.com",
  messagingSenderId: "742186388517",
  appId: "1:742186388517:web:35d9481fc5d9c6d54543cc",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider};
