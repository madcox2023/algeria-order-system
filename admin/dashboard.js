import { db, auth } from "../js/firebase.js";

import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc
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

        let sales = 0;
        let newOrders = 0;

        snapshot.forEach((doc) => {

            const order = doc.data();

            sales += Number(order.total || 0);

            if (order.status === "جديد") {
                newOrders++;
            }

            orders.innerHTML += `
                <div class="order-card">

                    <div class="customer">
                        <h3>${order.name}</h3>
                        <p>📞 ${order.phone}</p>
                        <p>📍 ${order.wilaya} - ${order.commune}</p>
                        <p>🏠 ${order.address}</p>
                        <p>🚚 ${order.shippingType}</p>
                        <p>📦 ${order.quantity}</p>
                    </div>

                    <div class="price">
                        ${order.total} دج
                    </div>

                    <div class="status">
                        ${order.status}
                    </div>

                </div>
            `;

        });

        document.getElementById("totalOrders").textContent = snapshot.size;
        document.getElementById("newOrders").textContent = newOrders;
        document.getElementById("totalSales").textContent = sales + " دج";

    });

}

// تسجيل الخروج
document.getElementById("logout").addEventListener("click", async () => {

    await signOut(auth);

});
