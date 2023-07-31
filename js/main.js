// /js/main.js

document.addEventListener("DOMContentLoaded", function () {

// Cart

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Open cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};

// Close cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Cart Working JS

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Creating functions
function ready() {
  // Remove items from cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);

  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  // Quantity changes
  var quantityInput = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInput.length; i++) {
    var input = quantityInput[i];
    input.addEventListener("change", quantityChanged);
  }

  // Add to cart
  var addCartButtons = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCartButtons.length; i++) {
    var button = addCartButtons[i];
    button.addEventListener("click", addCartClicked);
  }

  // Buy button work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

/*----------------------------------------------------------*/




// ... (existing code)

// Buy button - Modify the data sending mechanism for the order_confirmation.html page
function buyButtonClicked() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");

  // Create an array to store the purchased items
  var purchasedItems = [];

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var title = cartBox.getElementsByClassName("cart-product-title")[0].innerText;
    var quantity = parseInt(cartBox.getElementsByClassName("cart-quantity")[0].value);
    var price = cartBox.getElementsByClassName("cart-price")[0].innerText;
    var productImg = cartBox.getElementsByClassName("cart-img")[0].src;


    // Create an object to store the purchased item's data
    var purchasedItem = {
      title: title,
      quantity: quantity,
      price: price,
      productImg: productImg
    };

    // Push the purchased item data into the array
    purchasedItems.push(purchasedItem);
  }

  // Store the purchased items data in local storage for use in the order confirmation page
  localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));

  console.log(localStorage);

  // Redirect to the order_confirmation.html page
  window.location.href = "order_confirmation.html";
}

// Remove items from cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

// Quantity changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// Add to cart
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  // console.log(title, price, productImg);
  addProductToCart(title, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have already added this item to cart");
      return;
    }
  }

  var cartBoxContent = `
                    <img src="${productImg}" alt="" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>

                    <!--remove cart-->
                    <i class="bx bxs-trash-alt cart-remove"></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

// Update total price
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];

    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }

  //if price contains some Cents value
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

});