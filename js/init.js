const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem('catID')}.json`;
const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem('productsID')}.json`;
const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem('productsID')}.json`;
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
//INSERTAR EMAIL DE USUARIO Y FOTO(SI SE INGRESA POR GOOGLESIGN)
const storageEmailLogin = localStorage.getItem('emailValue')
const storagePicture = localStorage.getItem('profilePicture')
document.querySelector('#navbarNav ul').innerHTML += `
<li class="nav-item" id='profile'>
<img src="${storagePicture}" id='profilePicture'>
<a class="nav-link active" href="my-profile.html">${storageEmailLogin}</a>
</li>`

  if(document.getElementById('profilePicture').getAttribute('src') == null){
    document.getElementById('profilePicture').remove();
  }
  