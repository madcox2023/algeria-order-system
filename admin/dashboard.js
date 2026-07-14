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

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    loadOrders();

});

function loadOrders() {

    const q = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {

        const order = doc.data();

orders.innerHTML += `
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

        <select class="status-select" data-id="${doc.id}">
            <option value="جديد" ${order.status=="جديد"?"selected":""}>جديد</option>
            <option value="تم الاتصال" ${order.status=="تم الاتصال"?"selected":""}>تم الاتصال</option>
            <option value="قيد الشحن" ${order.status=="قيد الشحن"?"selected":""}>قيد الشحن</option>
            <option value="تم التوصيل" ${order.status=="تم التوصيل"?"selected":""}>تم التوصيل</option>
            <option value="ملغي" ${order.status=="ملغي"?"selected":""}>ملغي</option>
        </select>

        <button class="call-btn">
            📞 اتصال
        </button>

        <button class="copy-btn" data-phone="${order.phone}">
            📋 نسخ الرقم
        </button>

    </div>

</div>
`;

        });

        document.getElementById("totalOrders").textContent = snapshot.size;
        document.getElementById("newOrders").textContent = newOrders;
        document.getElementById("totalSales").textContent = totalSales + " دج";

        document.querySelectorAll(".status-select").forEach((select) => {

            select.addEventListener("change", async () => {

                try {

                    await updateDoc(
                        doc(db, "orders", select.dataset.id),
                        {
                            status: select.value
                        }
                    );

                } catch (error) {

                    console.error(error);
                    alert("حدث خطأ أثناء تحديث الحالة.");

                }

            });

        });

    });

}

document.getElementById("logout").addEventListener("click", async () => {

    try {

        await signOut(auth);

    } catch (error) {

        console.error(error);
        alert("تعذر تسجيل الخروج.");

    }

});
