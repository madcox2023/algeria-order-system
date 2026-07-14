import { db } from "../js/firebase.js";

import {
    collection,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const ordersContainer = document.getElementById("orders");

const q = query(
    collection(db, "orders"),
    orderBy("createdAt", "desc")
);

onSnapshot(q, (snapshot) => {

    ordersContainer.innerHTML = "";

    snapshot.forEach((doc) => {

        const order = doc.data();

        ordersContainer.innerHTML += `

<div class="order-card">

<h3>${order.name}</h3>

<p>📞 ${order.phone}</p>

<p>📍 ${order.wilaya} - ${order.commune}</p>

<p>🚚 ${order.shippingType}</p>

<p>📦 الكمية : ${order.quantity}</p>

<p>💰 ${order.total} دج</p>

<p>الحالة : ${order.status}</p>

</div>

`;

    });

});
