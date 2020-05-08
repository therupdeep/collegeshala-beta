if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("remove-cart");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem)
  }
  var addToCartButton = document.getElementsByClassName('add-to-cart-btn')
  for(var i =0; i<addToCartButton.length; i++) {
      var button = addToCartButton[i]
      button.addEventListener('click', addToCartClicked)
  }
}


function removeCartItem(event) {
    var buttonClicked = event.target;
      buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
      updateCartTotal();
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart")[0];
  var cartRows = cartItemContainer.getElementsByClassName(
    "cart-notes-info-tab"
  );
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var price = parseFloat(priceElement.innerHTML);
    total = total + price;
  }
  console.log(total);
  document.getElementsByClassName("cart-total-amount")[0].innerText = total;
}


function addToCartClicked(event) {
    var button = event.target
    var notesItem = button.parentElement.parentElement.parentElement.parentElement
    console.log(notesItem)
    var uniName = notesItem.getElementsByClassName('suggested-page-university-name')[0].innerText
    var notesName = notesItem.getElementsByClassName('heading-title')[0].innerText
    var nosOfPages = notesItem.getElementsByClassName('nos-of-pages')[0].innerText
    /*var notesImage = notesImage.getElementsByClassName('notes-image-area')[0]*/
    console.log(uniName, notesName, nosOfPages)
    addItemToCart(uniName, notesName, nosOfPages)
}

function addItemToCart(uniName, notesName, nosOfPages) {
    var cartRow = document.createElement('div')
    cartRow.innerText = uniName
    var cartItems = document.getElementsByClassName('cart')[0]
    cartItems.append(cartRow)
}