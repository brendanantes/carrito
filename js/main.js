window.onload = function () {
  totalize();
};

let data = [
  {
    id: 1,
    name: "Buda mega gigante",
    price: 58000,
    quantity: 0,
    photo: "img/buda1.jpeg",
  },
  {
    id: 2,
    name: "Buda de la paz",
    price: 20000,
    quantity: 0,
    photo: "img/buda2.jpeg",
  },
  {
    id: 3,
    name: "Buda flores",
    price: 40000,
    quantity: 0,
    photo: "img/buda3.jpeg",
  },
  {
    id: 4,
    name: "Diosa Shiva",
    price: 58200,
    quantity: 0,
    photo: "img/buda4.jpeg",
  },
  {
    id: 5,
    name: "Buda meditando",
    price: 30000,
    quantity: 0,
    photo: "img/buda5.jpeg",
  },
  {
    id: 6,
    name: "Buda soñador",
    price: 30000,
    quantity: 0,
    photo: "img/buda6.jpeg",
  },
  {
    id: 7,
    name: "Buda soñador chico",
    price: 19000,
    quantity: 0,
    photo: "img/buda7.jpeg",
  },
  {
    id: 8,
    name: "Buda gigante",
    price: 100000,
    quantity: 0,
    photo: "img/buda8.jpeg",
  },
];

if (localStorage.getItem("cart") === null) {
  localStorage.setItem("cart", JSON.stringify(data));
}

data = localStorage.getItem("cart");
data = JSON.parse(data);

let container = document.querySelector(".container");
container.innerHTML = "";

data.forEach((element) => {
  container.innerHTML += `
    <div class="product">
        <img src="${element.photo}" alt="Producto ${element.id}">
        <div class="product-info">
            <p>${element.name}</p>
            <p>Precio: $${element.price}</p>
        </div>
        <div class="controlador-cantidades">
            <button onclick="decreaseQuantity(this)" id="${element.id}">-</button>
            <span>${element.quantity}</span>
            <button onclick="increaseQuantity(this)" id="${element.id}">+</button>
        </div>
    </div>`;
});

function increaseQuantity(button) {
  let container = button.parentElement;
  let span = container.querySelector("span");
  let previousQuantity = parseInt(span.textContent);
  let newQuantity = previousQuantity + 1;

  span.textContent = newQuantity;

  let data = localStorage.getItem("cart");
  data = JSON.parse(data);

  let productoModificar = data.find((item) => item.id === parseInt(button.id));

  if (productoModificar) {
    productoModificar.quantity++;
  }

  console.log(data);
  localStorage.setItem("cart", JSON.stringify(data));
  span.textContent = newQuantity;
  totalize();
}

function decreaseQuantity(button) {
  let container = button.parentElement;
  let span = container.querySelector("span");
  let previousQuantity = parseInt(span.textContent);

  if (previousQuantity > 0) {
    let newQuantity = previousQuantity - 1;
    span.textContent = newQuantity;

    let data = localStorage.getItem("cart");
    data = JSON.parse(data);
    let productoModificar = data.find(
      (item) => item.id === parseInt(button.id)
    );
    if (productoModificar) {
      productoModificar.quantity--;
    }
    console.log(data);
    localStorage.setItem("cart", JSON.stringify(data));
    span.textContent = newQuantity;
  }
  totalize();
}

function totalize() {
  let data = localStorage.getItem("cart");
  data = JSON.parse(data);
  let total = 0;
  data.forEach((element) => {
    total += element.price * element.quantity;
  });
  localStorage.setItem("totalCart", total);
  let cartSummary = document.querySelector(".cart-summary span");
  cartSummary.textContent = `Total: $${total}`;
}

function showModal() {
  let data = JSON.parse(localStorage.getItem("cart")) || [];
  let productDetails = document.getElementById("productDetails");
  let modalTotal = document.getElementById("modalTotal");
  productDetails.innerHTML = "";
  let total = 0;

  data.forEach((item) => {
    if (item.quantity > 0) {
      productDetails.innerHTML += `<p>${item.name} x${item.quantity} - $${
        item.price * item.quantity
      }</p>`;
      total += item.price * item.quantity;
    }
  });

  modalTotal.textContent = `$${total}`;
  document.getElementById("myModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function confirmPurchase() {
  alert("Compra realizada con éxito!");
  localStorage.removeItem("cart");
  closeModal();
  location.reload();
}
