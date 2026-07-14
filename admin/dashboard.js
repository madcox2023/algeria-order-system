import { db, auth } from "../js/firebase.js";

import {
    collection,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const orders = document.getElementById("orders");

// حماية الصفحة
onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    loadOrders();

});

// تحميل الطلبات
function loadOrders() {

    const q = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {

        orders.innerHTML = "";

        snapshot.forEach((doc) => {

            const order = doc.data();

            orders.innerHTML += `
                <div class="order-card">

                    <h2>${order.name}</h2>

                    <p>📞 ${order.phone}</p>

                    <p>📍 ${order.wilaya} - ${order.commune}</p>

                    <p>🏠 ${order.address}</p>

                    <p>🚚 ${order.shippingType}</p>

                    <p>📦 ${order.quantity}</p>

                    <p>💰 ${order.total} دج</p>

                    <p>📌 ${order.status}</p>

                </div>
            `;

        });

    });

}

// تسجيل الخروج
document.getElementById("logout").addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "login.html";

});
