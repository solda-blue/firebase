// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// 인증을 위한 getAuth가져오기
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: "test-875b0",
  storageBucket: "test-875b0.appspot.com",
  messagingSenderId: "259184306526",
  appId: "1:259184306526:web:a7fc54b1b4beef324b87cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log(app);

// 사용하고자 하는 서비스를 들고와서 사용
// 인증 서비스에 관한 내용 들고와서 사용

export const auth = getAuth(app);
export const db = getFirestore(app);