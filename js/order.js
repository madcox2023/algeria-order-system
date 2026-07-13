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
const name = document.getElementById("name").value.trim();
const phone = document.getElementById("phone").value.trim();
const wilaya = document.getElementById("wilaya").value;
const commune = document.getElementById("commune").value;
const address = document.getElementById("address").value.trim();

const shippingSelect = document.getElementById("shippingType");

const shippingType =
    shippingSelect.options[shippingSelect.selectedIndex].text;

const quantity = Number(
    document.getElementById("qty").textContent
);

const productPrice = Number(
    document.getElementById("productPrice").textContent.replace(/\D/g, "")
);

const shippingPrice = Number(
    document.getElementById("shippingPrice").textContent.replace(/\D/g, "")
);

const total = Number(
    document.getElementById("totalPrice").textContent.replace(/\D/g, "")
);
    try{

        await addDoc(collection(db, "orders"), {

    name,
    phone,
    wilaya,
    commune,
    address,

    shippingType,
    quantity,

    productPrice,
    shippingPrice,
    total,

    status: "جديد",

    createdAt: serverTimestamp()

});

        alert("✅ تم إرسال الطلب بنجاح");

        form.reset();
document.getElementById("qty").textContent = "1";

document.getElementById("shippingPrice").textContent = "0 دج";

document.getElementById("totalPrice").textContent = "3500 دج";
    }

    catch(error){

        console.error(error);

        alert("حدث خطأ أثناء إرسال الطلب");

    }

 try {

   ...

}
catch(error){

   ...

}
finally{

    submitBtn.disabled = false;

    submitBtn.textContent = "تأكيد الطلب";

}

});
