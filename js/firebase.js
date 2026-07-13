import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

export const firebaseConfig = {

  apiKey: "AIzaSy...",

  authDomain: "algeria-order-system.firebaseapp.com",

  projectId: "algeria-order-system",

  storageBucket: "algeria-order-system.firebasestorage.app",

  messagingSenderId: "865814720381",

  appId: "1:865814720381:web:c9e7bec77af884f5aae614"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
