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
const quantity = Number(document.getElementById("quantity").textContent);

const shippingType = document.getElementById("shipping").value;

const shippingPrice = Number(
    document.getElementById("shippingPrice").textContent
);

const productPrice = Number(
    document.getElementById("productPrice").textContent
);

const total = Number(
    document.getElementById("totalPrice").textContent
);
    try{

        await addDoc(collection(db, "orders"), {

    name,
    phone,
    wilaya,
    commune,
    address,

    shippingType,
    shippingPrice,

    quantity,

    productPrice,

    total,

    status: "جديد",

    createdAt: serverTimestamp()

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
