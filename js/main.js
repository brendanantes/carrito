window.onload = function () {
  totalize();
};

/* let data = [
  {
    id: 1,
    name: "Producto 1",
    price: 10,
    quantity: 0,
    photo: "https://picsum.photos/150?random=1",
  },
  {
    id: 2,
    name: "Producto 2",
    price: 15,
    quantity: 0,
    photo: "https://picsum.photos/150?random=2",
  },
  {
    id: 3,
    name: "Producto 3",
    price: 20,
    quantity: 0,
    photo: "https://picsum.photos/150?random=3",
  },
  {
    id: 4,
    name: "Producto 4",
    price: 25,
    quantity: 0,
    photo: "https://picsum.photos/150?random=4",
  },
  {
    id: 5,
    name: "Producto 5",
    price: 30,
    quantity: 0,
    photo: "https://picsum.photos/150?random=5",
  },
  {
    id: 6,
    name: "Producto 6",
    price: 12,
    quantity: 0,
    photo: "https://picsum.photos/150?random=6",
  },
  {
    id: 7,
    name: "Producto 7",
    price: 18,
    quantity: 0,
    photo: "https://picsum.photos/150?random=7",
  },
  {
    id: 8,
    name: "Producto 8",
    price: 22,
    quantity: 0,
    photo: "https://picsum.photos/150?random=8",
  },
  {
    id: 9,
    name: "Producto 9",
    price: 27,
    quantity: 0,
    photo: "https://picsum.photos/150?random=9",
  },
  {
    id: 10,
    name: "Producto 10",
    price: 35,
    quantity: 0,
    photo: "https://picsum.photos/150?random=10",
  },
]; */

let dataResult = [];

async function cargarDatos() {
  try {
    const response = await fetch("http://localhost:8080/data.json");
    if (!response.ok) throw new Error("Error en la respuesta");
    dataResult = await response.json();
    return dataResult;
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}

async function renderProducts() {
  let data = await cargarDatos();

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
}

renderProducts();

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
  Swal.fire({
    title: "¡Éxito!",
    text: "Los productos se cargaron correctamente.",
    icon: "success",
    confirmButtonText: "Aceptar",
  }).then(() => {
    localStorage.removeItem("cart");
    closeModal();
    location.reload();
  });
}
