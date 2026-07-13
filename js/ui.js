const wilayaSelect = document.getElementById("wilaya");
const communeSelect = document.getElementById("commune");

let wilayas = [];

// تحميل ملف JSON
fetch("./data/wilayas.json")
  .then(response => response.json())
  .then(data => {

    wilayas = data;

    wilayaSelect.innerHTML =
      '<option value="">اختر الولاية</option>';

    data.forEach(wilaya => {

      const option = document.createElement("option");

      option.value = wilaya.name;
      option.textContent = wilaya.name;

      wilayaSelect.appendChild(option);

    });

  });

// عند تغيير الولاية
wilayaSelect.addEventListener("change", () => {

  communeSelect.innerHTML =
    '<option value="">اختر البلدية</option>';

  const selected = wilayas.find(
    w => w.name === wilayaSelect.value
  );

  if (!selected) return;

  selected.communes.forEach(commune => {

    const option = document.createElement("option");

    option.value = commune;
    option.textContent = commune;

    communeSelect.appendChild(option);

  });

});
