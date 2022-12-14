    //gurdamos en el almacenamiento local el id de los productos
    function setproductsID(id) {
        localStorage.setItem("productsID", id);
        window.location = "product-info.html"
    }
    //FUNCION QUE AGREGA LAS CARDS DE PRODUCTOS
    
    function innerContainer(product){
        let container = document.querySelector('#cat-list-container');
        container.innerHTML += 
        ` 
    <div
        onclick="setproductsID(${product.id})"
        class="list-group-item list-group-item-action cursor-active"
        >
        <div class="row">
            <div class="col-3">
            <img
                src="${product.image}"
                alt="${product.description}"
                class="img-thumbnail"
            />
            </div>
            <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">${product.name}</h4>
                <small class="text-muted">${product.soldCount} artículos</small>
            </div>
            <div>
                <h4 class="mb-2">${product.currency} ${product.cost}</h4>
            </div>
              <p class="mb-1">${product.description}</p>
            </div>
            </div>
    </div>

        ` 
    }
    
    function innerFor(product, array){
        for (product of array) {
            innerContainer(product)
    }
    // FUNCION ASINCRONA QUE HACE EL FETCH Y TRABAJA CON LA RESPUESTA
    }
    async function getData(){
        let data = await fetch(PRODUCTS_URL);
        if(data.ok){
            let container = document.querySelector('#cat-list-container');
            let response = await data.json(); 
            let productsArray = response.products;
            let product = '';
            innerFor(product, productsArray);
    //ORDEN ASCENDENTE
            document.getElementById('sortAsc').addEventListener('click', function(){
                const ASC = productsArray.sort(function(a, b) {
                    let aCount = parseInt(a.cost);
                    let bCount = parseInt(b.cost);
                    if ( aCount < bCount ){ return -1; }
                    if ( aCount > bCount ){ return 1; }
                    return 0;
                })
                container.innerHTML = ''
                innerFor(product, ASC)
            })
    //ORDEN DESCENDENTE
            document.getElementById('sortDesc').addEventListener('click', function(){
                
                const DES = productsArray.sort(function(a, b) {
                    let aCount = parseInt(a.cost);
                    let bCount = parseInt(b.cost);
                    if ( aCount > bCount ){ return -1; }
                    if ( aCount < bCount ){ return 1; }
                    return 0;
                })
                container.innerHTML = ''
                innerFor(product, DES)
            })
    //ORDEN RELATIVO       
            document.getElementById('sortByRel').addEventListener('click', function(){
                const REL = productsArray.sort(function(a, b) {
                    let aCount = parseInt(a.soldCount);
                    let bCount = parseInt(b.soldCount);
                    if ( aCount > bCount ){ return -1; }
                    if ( aCount < bCount ){ return 1; }
                    return 0;
                })
                container.innerHTML = ''
                innerFor(product, REL)
            })    
    //BORRA LOS CAMPOS DE FILTROS Y ORDENA LOS PRODUCTOS POR DEFAULT        
            document.getElementById("clearRangeFilter").addEventListener("click", function(){
                document.getElementById("rangeFilterPriceMin").value = "";
                document.getElementById("rangeFilterPriceMax").value = "";
                container.innerHTML = ''
                innerFor(product, productsArray)
                
            });
            
            document.getElementById("rangeFilterPrice").addEventListener("click", function(){
                minCount = document.getElementById("rangeFilterPriceMin").value;
                maxCount = document.getElementById("rangeFilterPriceMax").value;
                container.innerHTML = ''
                if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
                    minCount = parseInt(minCount);
                }
                else{
                    minCount = undefined;
                }
                if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
                    maxCount = parseInt(maxCount);
                }
                else{
                    maxCount = undefined;
                }
                for (let product of productsArray) {
                    if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
                    ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){
                        innerContainer(product)
                    }
            }
        })
            document.getElementById('searchFilter').addEventListener('input',function(){
                let inputValue = document.getElementById('searchFilter').value;
                container.innerHTML = ''
                        for(let product of productsArray){
                            inputValue = inputValue.toLowerCase()
                        let name = product.name.toLowerCase()
                        let description = product.description.toLowerCase()
                if((name.includes(inputValue) === true || description.includes(inputValue) === true)){
                    innerContainer(product)
                }
            
            
        }
            })
        }
        }
            getData();
