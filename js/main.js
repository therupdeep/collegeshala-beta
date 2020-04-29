let carts = document.querySelectorAll(".add-to-cart-btn");

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers();
  });
}

function cartNumbers() {
  var productNumbers = localStorage.getItem("cartNumbers");
  console.log(productNumbers);
  console.log(typeof productNumbers);
  productNumbers = parseInt(productNumbers);
  console.log(typeof productNumbers);
  localStorage.setItem("cartNumbers", 1);
}

