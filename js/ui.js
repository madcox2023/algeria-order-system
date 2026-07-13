// =========================
// Product Settings
// =========================

const PRODUCT_PRICE = 3500;

let quantity = 1;

let shippingPrice = 0;


// =========================
// Elements
// =========================

const qtyElement = document.getElementById("qty");

const plusBtn = document.getElementById("plus");

const minusBtn = document.getElementById("minus");

const shippingType = document.getElementById("shippingType");

const productPriceElement = document.getElementById("productPrice");

const shippingPriceElement = document.getElementById("shippingPrice");

const totalPriceElement = document.getElementById("totalPrice");


// =========================
// Initial Prices
// =========================

productPriceElement.textContent = PRODUCT_PRICE + " دج";


// =========================
// Calculate Total
// =========================

function updateTotal(){

    const total =
        (PRODUCT_PRICE * quantity) + shippingPrice;

    qtyElement.textContent = quantity;

    shippingPriceElement.textContent =
        shippingPrice + " دج";

    totalPriceElement.textContent =
        total + " دج";

}


// =========================
// Quantity +
// =========================

plusBtn.addEventListener("click",()=>{

    quantity++;

    updateTotal();

});


// =========================
// Quantity -
// =========================

minusBtn.addEventListener("click",()=>{

    if(quantity>1){

        quantity--;

        updateTotal();

    }

});


// =========================
// Shipping
// =========================

shippingType.addEventListener("change",()=>{

    if(shippingType.value==="home"){

        shippingPrice=600;

    }else{

        shippingPrice=400;

    }

    updateTotal();

});

updateTotal();
