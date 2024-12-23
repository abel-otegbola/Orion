// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDyU8LOmHhpj76c_KfKFC-VGoTIV6xAhiY",
    authDomain: "flashnotes-prod.firebaseapp.com",
    projectId: "flashnotes-prod",
    storageBucket: "flashnotes-prod.firebasestorage.app",
    messagingSenderId: "55658768055",
    appId: "1:55658768055:web:682c4852056e8c9bfa8f32",
    measurementId: "G-P8YFQNBL9M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
export const db = getFirestore();