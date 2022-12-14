const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem(
  "catID"
)}.json`;
const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem(
  "productsID"
)}.json`;
const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem(
  "productsID"
)}.json`;
const CART_INFO_URL =
  "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};
//INSERTAR EMAIL DE USUARIO Y FOTO DEL DROPDOWN
let storageEmailLogin = localStorage.getItem("emailValue");
let storageitems = JSON.parse(localStorage.getItem(storageEmailLogin));
let imagePro = "./img/profile.jpg";
if (storageitems) {
  imagePro = storageitems.imageProfile;
}

if (storageEmailLogin !== null) {
  document.querySelector("#navbarNav ul").innerHTML += `
<div class="dropdown">
<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
${localStorage.getItem("emailValue")}
</button>
<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
<li><a class="dropdown-item profileMenu" href="my-profile.html">Mi Perfil<img src="${imagePro}" id='profilePicture'></a>
<li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
<li><a class="dropdown-item" id='closeSesion' href="#">Cerrar Sesion</a></li>
  </ul>
</div>
`;
  if (!imagePro) {
    document
      .getElementById("profilePicture")
      .setAttribute("src", "./img/profile.jpg");
  }

  //SI NO HAY USUARIO REGISTRADO EL BOTON MENU SE CONVIERTE EN INICIAR SESION
}
if (storageEmailLogin === null) {
  document.querySelector(
    "#navbarNav ul"
  ).innerHTML += `<a href='./index.html'><button class="btn btn-secondary" type="button">
    Iniciar Sesion
    </button></a> `;
}
//BOTON CERRAR SESION
const closeSession = document.getElementById("closeSesion");
closeSession.addEventListener("click", () => {
  localStorage.removeItem("emailValue");
  localStorage.removeItem("profilePicture");
  window.location = "index.html";
});
