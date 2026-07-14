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

const ordersContainer = document.getElementById("orders");

const totalOrders = document.getElementById("totalOrders");
const newOrders = document.getElementById("newOrders");
const totalSales = document.getElementById("totalSales");

const logoutBtn = document.getElementById("logout");
onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.replace("login.html");
        return;

    }

    loadOrders();

});
logoutBtn.addEventListener("click", async () => {

    try {

        await signOut(auth);

        window.location.href = "login.html";

    } catch (error) {

        console.error(error);

        alert("تعذر تسجيل الخروج.");

    }

});
function loadOrders() {

    const ordersQuery = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc")
    );

    onSnapshot(ordersQuery, (snapshot) => {

        ordersContainer.innerHTML = "";

        let sales = 0;
        let newCount = 0;

        snapshot.forEach((docSnap) => {

            const order = docSnap.data();

            sales += Number(order.total || 0);

            if (order.status === "جديد") {
                newCount++;
            }

            ordersContainer.innerHTML += `
                <div class="order-card">

                    <div class="customer">

                        <h3>${order.name}</h3>

                        <p>📞 ${order.phone}</p>

                        <p>📍 ${order.wilaya} - ${order.commune}</p>

                        <p>🏠 ${order.address}</p>

                        <p>🚚 ${order.shippingType}</p>

                        <p>📦 ${order.quantity} قطعة</p>

                    </div>

                    <div class="price">
                        ${order.total} دج
                    </div>

                    <div class="actions">

                        <select class="status-select" data-id="${docSnap.id}">

                            <option value="جديد" ${order.status === "جديد" ? "selected" : ""}>جديد</option>

                            <option value="تم الاتصال" ${order.status === "تم الاتصال" ? "selected" : ""}>تم الاتصال</option>

                            <option value="قيد الشحن" ${order.status === "قيد الشحن" ? "selected" : ""}>قيد الشحن</option>

                            <option value="تم التوصيل" ${order.status === "تم التوصيل" ? "selected" : ""}>تم التوصيل</option>

                            <option value="ملغي" ${order.status === "ملغي" ? "selected" : ""}>ملغي</option>

                        </select>

                    </div>

                </div>
            `;

        });

totalOrders.textContent = snapshot.size;
newOrders.textContent = newCount;
totalSales.textContent = sales + " دج";

bindStatusEvents();

    });

}

function bindStatusEvents() {

    document.querySelectorAll(".status-select").forEach((select) => {

        select.onchange = async () => {

            try {

                const orderRef = doc(
                    db,
                    "orders",
                    select.dataset.id
                );

                await updateDoc(orderRef, {
                    status: select.value
                });

            } catch (error) {

                console.error(error);

                alert("تعذر تحديث حالة الطلب.");

            }

        };

    });

}
