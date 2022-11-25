console.log("processing products...")

function populateProduct(data){
    console.log(data)
    const product = document.querySelector("#products");
    const createTemp = document.createElement("div")
    createTemp.className = "card mx-4 sm my-4"
    createTemp.innerHTML = `
    <img src="${data.image}" class="card-img-top" alt="product">
    <div class="card-body">
      <h5 class="card-title">${data.name}</h5>
      <p class="card-text">${data.type}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>`
    product.appendChild(createTemp)
    console.log(createTemp)
}

function fetchProduct(){
    fetch("http://127.0.0.1:3030/api/v1/products")
    .then((res) => res.json())
    .then((data) => data.products.map(item => populateProduct(item)))
    .catch(err => console.log(err))
}

fetchProduct()