import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const app = initializeApp({
    apiKey: "AIzaSyCoe72s9wAZoQLMDWXPtp61zccvRaOdovg",
    authDomain: "nada-c55d3.firebaseapp.com",
    databaseURL: "https://nada-c55d3-default-rtdb.firebaseio.com",
    projectId: "nada-c55d3",
    storageBucket: "nada-c55d3.appspot.com",
    messagingSenderId: "263793207130",
    appId: "1:263793207130:web:16fd622a0214db03037563",
    measurementId: "G-DZWJTJEJHM"
});
const auth = getAuth();
const db = getFirestore(app)

export {auth, db}