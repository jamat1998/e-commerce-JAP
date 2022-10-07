const container = document.getElementById("containerCart");

function inn(img, name, currency, cost) {
  container.innerHTML += `
    <td><img src='${img}' width='100px'></td>
    <td>${name}</td>
    <td>${currency}</td>
    <td>${cost}</td>
    <td><div class="input-group-sm col-5">
    <input class='cuantity' type='number'class="form-control" value=1>
    </div>
    </td>
    <td>${currency} ${cost}</td>
    </tr>
    </tbody>
    </table>
    <tr>
    `;
}
async function getData() {
  let data = await fetch(CART_INFO_URL);
  if (data.ok) {
    let response = await data.json();
    inn(
      response.articles[0].image,
      response.articles[0].name,
      response.articles[0].currency,
      response.articles[0].unitCost
    );
    let storage = JSON.parse(localStorage.getItem("data"));
    for (let x of storage) {
      let name = x[2];
      let image = x[1];
      let currency = x[4];
      let cost = x[3];
      inn(name, image, currency, cost);

      const input = document.querySelectorAll(".cuantity");

      for (let i of input) {
        i.addEventListener("input", (e) => {
          let cuantity = e.target.value;
          let cost = e.path[3].cells[3].textContent;
          let calc = parseInt(cuantity) * parseInt(cost);
          let subtotal = e.path[3].cells[5];
          let currency = e.path[3].cells[2].textContent;

          if (calc > 0) {
            subtotal.innerHTML = `${currency} ${calc}`;
          } else subtotal.innerHTML = `${currency} 0`;
        });
      }
    }
  }
}
getData();
