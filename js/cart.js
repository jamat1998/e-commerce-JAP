let container = document.getElementById("containerCart");
let costWithSend = document.getElementById("costWithSend");
let sendCost = document.getElementById("sendCost");
let subtotalCost = document.getElementById("subtotalCost");
let inputExpress = document.getElementById("inputExpress");
let inputStandar = document.getElementById("inputStandar");
let inputPremium = document.getElementById("inputPremium");
let push = false;

//funcion para insertar el contenido

function inner(img, name, cost, id) {
  container.innerHTML += `
  <td><img src='${img}' width='100px'></td>
  <td>${name}</td>
    <td>USD ${cost}</td>
    <td><div class="input-group-sm col-5">
    <input type='number'class="form-control input" value=1 min=1 required>
    </div>
    </td>
    <td class='ttl'>USD ${cost}</td>
    <td>
    <button type="button" class="btn btn-outline-danger btnDelete" value=${id}>Eliminar</button>
    </td>
    </tbody>
    </table>
    `;
}

//funcion para realizar los calculos totales

function calcs(porcent) {
  let subTotalValue = subtotalCost.textContent.slice(
    4,
    subtotalCost.textContent.length
  );
  let total =
    parseInt(subTotalValue) + (parseInt(subTotalValue) / 100) * porcent;
  let sendType = (parseInt(subTotalValue) / 100) * porcent;
  costWithSend.innerHTML = `USD ${total}`;
  sendCost.innerHTML = `USD ${sendType}`;
}

function totalsBuy() {
  let ttl = document.querySelectorAll(".ttl");
  let totalBuy = [];
  for (let element of ttl) {
    let allCount = element.textContent.slice(4, element.textContent.length);
    totalBuy.push(parseInt(allCount));
    let childElements = -element.parentElement.parentElement.childElementCount;
    totalBuy.slice(childElements);
    let subtotal = totalBuy.reduce(function (a, b) {
      return a + b;
    });
    subtotalCost.innerHTML = `USD ${parseInt(subtotal)}`;
    if (inputExpress.checked) {
      calcs(7);
    }
    if (inputStandar.checked) {
      calcs(5);
    }
    if (inputPremium.checked) {
      calcs(15);
    }
  }
}
async function getData() {
  let data = await fetch(CART_INFO_URL);
  if (data.ok) {
    let response = await data.json();

    // INSERTAR RESPUESTA DEL JSON(PRIMER ARTICULO)

    inner(
      response.articles[0].image,
      response.articles[0].name,
      response.articles[0].unitCost,
      response.articles[0].id
    );

    //OBTENER ARTICULOS GUARDADOS EN EL LOCALSTORAGE

    let storage = JSON.parse(localStorage.getItem("CART"));
    let array = [];
    let ids = [];
    array.push(storage);
    for (let item of array[0]) {
      let id = item.id;
      let name = item.name;
      let image = item.image;
      let cost = item.cost;
      item.currency == 'UYU' 
      ? inner(image, name, cost/40, id) 
      : inner(image, name, cost, id);
      ids.push(item.id);
    }
    const input = document.querySelectorAll(".input");

    //EVENTO INPUT PARA MODIFICAR EN TIEMPO REAL EL SUBTOTAL

    for (let i of input) {
      i.addEventListener("input", (e) => {
        let cuantity = e.target.value;
        let cost = e.path[3].cells[2].textContent.slice(4, e.path[3].cells[2].textContent.length);
        let calc = parseInt(cuantity) * parseInt(cost);
        let subtotal = e.path[3].cells[4];
        if (calc > 0) {
          subtotal.innerHTML = `USD ${calc}`;
        } else subtotal.innerHTML = `USD 0`;
        totalsBuy();
      });
    }
    //FUNCIONALIDAD DEL BOTON ELIMINAR

    let btn = document.querySelectorAll(".btnDelete");

    for (let i of btn) {
      i.addEventListener("click", (e) => {
        e.preventDefault();
        e.path[2].remove();
        let itemId = parseInt(e.target.value);
        if (ids.includes(itemId)) {
          let index = ids.indexOf(itemId);
          array[0].splice(index, 1);
          ids.splice(index, 1);
          localStorage.setItem("CART", JSON.stringify(array[0]));
        }
      });
    }
    totalsBuy();
  }
}
getData();

//VALIDACIONES INPUTS
(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        push = true;
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          lblTransfer.classList.add("is-invalid");
        }
        if (form.checkValidity()) {
          event.preventDefault();
          const alert = (message, type) => {
            const alertPlaceholder = document.getElementById(
              "liveAlertPlaceholder"
            );

            const wrapper = document.createElement("div");
            wrapper.innerHTML = [
              `<div class="alert alert-${type} alert-dismissible" role="alert">`,
              `   <div>${message}</div>`,
              '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
              "</div>",
            ].join("");
            alertPlaceholder.append(wrapper);
          };
          async function response() {
            let data = await fetch(CART_BUY_URL);
            if (data.ok) {
              let response = await data.json();
              const alertTrigger = document.getElementById("liveAlertBtn");
              alertTrigger.addEventListener("click", () => {
                alert(`${response.msg}`, "success");
                setTimeout(() => {
                  location.reload();
                }, 3500);
              });
            }
          }
          response();
        }
        form.classList.add("was-validated");
       
        if (push) {
          document.addEventListener("input", () => {
            if (
              inputCredit.checked &&
              expDate.value != "" &&
              zipCode.value !== "" &&
              cardNumber.value !== ""
            ) {
              lblTransfer.classList.remove("is-invalid");
            }
            if (
              (inputCredit.checked && expDate.value == "") ||
              zipCode.value == "" ||
              cardNumber.value == ""
            ) {
              lblTransfer.classList.add("is-invalid");
            }
            if (inputAccount.checked && accountNumber.value !== "") {
              lblTransfer.classList.remove("is-invalid");
            }
            if (inputAccount.checked && accountNumber.value == "") {
              lblTransfer.classList.add("is-invalid");
            }
          });
        }
      },
      false
    );
  });
})();

//ACTUALIZACION DE COSTOS EN TIEMPO REAL

inputExpress.addEventListener("click", () => {
  calcs(7);
});
inputStandar.addEventListener("click", () => {
  calcs(5);
});
inputPremium.addEventListener("click", () => {
  calcs(15);
});

//VALIDACIONES MODAL INPUTS

let lblTransfer = document.getElementById("lblTransfer");
let inputAccount = document.getElementById("input-account");
let expDate = document.getElementById("exp-date");
let zipCode = document.getElementById("zip-code");
let cardNumber = document.getElementById("card-number");
let accountNumber = document.getElementById("account-number");
let inputCredit = document.getElementById("input-credit");

//DESACTIVAR CAMPOS NO SELECCIONADOS

inputAccount.addEventListener("click", () => {
  expDate.disabled = true;
  zipCode.disabled = true;
  cardNumber.disabled = true;
  accountNumber.disabled = false;
  cardNumber.value = ``;
  zipCode.value = ``;
  expDate.value = ``;
});
inputCredit.addEventListener("click", () => {
  expDate.disabled = false;
  zipCode.disabled = false;
  cardNumber.disabled = false;
  accountNumber.disabled = true;
  accountNumber.value = ``;
});
