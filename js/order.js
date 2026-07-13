import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const form = document.getElementById("orderForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const submitBtn = form.querySelector("button");

    submitBtn.disabled = true;
    submitBtn.textContent = "جارٍ إرسال الطلب...";

    try{

        await addDoc(collection(db,"orders"),{

            name:document.getElementById("name").value.trim(),

            phone:document.getElementById("phone").value.trim(),

            wilaya:document.getElementById("wilaya").value,

            commune:document.getElementById("commune").value,

            address:document.getElementById("address").value.trim(),

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

        alert("حدث خطأ أثناء إرسال الطلب");

    }

    submitBtn.disabled=false;

    submitBtn.textContent="تأكيد الطلب";

});
