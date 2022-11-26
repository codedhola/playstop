console.log("processing products...")

function populateProduct(data){
    console.log(data)
    const product = document.querySelector("#products");
    const createTemp = document.createElement("div")
    createTemp.className = "card mx-4 sm my-4"
    createTemp.innerHTML = `
    <img src="${data.image}" class="card-img-top product-img" alt="product">
    <div class="card-body">
      <h5 class="card-title">${data.name}</h5>
      <p class="card-text">${data.description} <span class="m-sm-6">$${data.price}</span></p>
      <a href="http://127.0.0.1:5500/client/checkout.html?=${data._id}" class="btn btn-primary">Buy now</a>
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



const paymentForm = document.getElementById('payment-form');
     paymentForm.addEventListener("submit", payFincra, false);
function payFincra(e) {
       Fincra.initialize({
         key: "pk_test_NjM2OTA0MjU0MGUwNjU4MmU2NTIyOTNkOjoxMjQ2NDA=",
         amount: document.getElementById("amount").value * 1,
         currency: "NGN",
         customer: {
             name: document.getElementById("name").value,
             email: document.getElementById("email").value,
             phoneNumber: document.getElementById("number").value,
           },
        //Kindly chose the bearer of the fee
        feeBearer: "customer",
 
         onClose: function () {
           alert("Transaction was not completed, window closed.");
         },
         onSuccess: function (data) {
           const reference = data.reference;
    alert("Payment complete! Reference: " + reference);
         },
       });
     }

