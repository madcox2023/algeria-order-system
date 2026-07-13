import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBwkhEDUQw86vY_i0WXA43gH6BVZ3NzcHw",
  authDomain: "algeria-order-system.firebaseapp.com",
  projectId: "algeria-order-system",
  storageBucket: "algeria-order-system.firebasestorage.app",
  messagingSenderId: "865814720381",
  appId: "1:865814720381:web:c9e7bec77af884f5aae614"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// زر الإرسال
const form = document.getElementById("orderForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const wilaya = document.getElementById("wilaya").value;
    const commune = document.getElementById("commune").value;
    const address = document.getElementById("address").value;

    try {

        await addDoc(collection(db, "orders"), {

            name,
            phone,
            wilaya,
            commune,
            address,

            quantity:1,
            total:0,

            status:"جديد",

            createdAt:serverTimestamp()

        });

        alert("✅ تم إرسال الطلب بنجاح");

        form.reset();

    }

    catch(error){

        console.error(error);

        alert("حدث خطأ");

    }

});
