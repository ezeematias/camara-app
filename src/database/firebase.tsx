// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD5uLWGQUpUpX94tuwdfeZOidX-zsCJII",
  authDomain: "db-login-app-59134.firebaseapp.com",
  projectId: "db-login-app-59134",
  storageBucket: "db-login-app-59134.appspot.com",
  messagingSenderId: "105086574080",
  appId: "1:105086574080:web:9ccd1494c155e5e073c2e5"
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export const auth = getAuth();

export default firebaseConfig;