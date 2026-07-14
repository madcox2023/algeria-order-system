onSnapshot(q, (snapshot) => {

    orders.innerHTML = "";

    let sales = 0;
    let newOrders = 0;

    snapshot.forEach((docSnap) => {

        const order = docSnap.data();

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

            <div>

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

    document.querySelectorAll(".status-select").forEach((select) => {

        select.addEventListener("change", async () => {

            const orderRef = doc(db, "orders", select.dataset.id);

            await updateDoc(orderRef, {
                status: select.value
            });

        });

    });

    document.getElementById("totalOrders").textContent = snapshot.size;
    document.getElementById("newOrders").textContent = newOrders;
    document.getElementById("totalSales").textContent = sales + " دج";

});
