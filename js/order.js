// js/order.js

document.addEventListener("DOMContentLoaded", function () {
  // Check if localStorage is available in the browser
  if (typeof localStorage !== "undefined") {
      // Retrieve the purchasedItems data from local storage
      var purchasedItems = JSON.parse(localStorage.getItem("purchasedItems"));

      // Check if purchasedItems data is available
      if (purchasedItems && purchasedItems.length > 0) {
          // Display the purchasedItems data on the order_confirmation.html page
          var orderContent = document.querySelector(".order-content");
          var totalPriceBox = document.querySelector(".total-price");
          var totalAmount = 0;

          purchasedItems.forEach(function (item) {
              var orderBox = document.createElement("div");
              orderBox.classList.add("order-box");

              var orderImg = document.createElement("img");
              orderImg.src = item.productImg;
              orderImg.alt = item.title;
              orderImg.classList.add("order-img");
              orderBox.appendChild(orderImg);

              var orderTitle = document.createElement("div");
              orderTitle.textContent = item.title;
              orderTitle.classList.add("order-title");
              orderBox.appendChild(orderTitle);

              var orderQuantity = document.createElement("div");
              orderQuantity.textContent = item.quantity;
              orderQuantity.classList.add("order-quantity");
              orderBox.appendChild(orderQuantity);

              var orderPrice = document.createElement("div");
              orderPrice.textContent = item.price;
              orderPrice.classList.add("order-price");
              orderBox.appendChild(orderPrice);

              orderContent.appendChild(orderBox);

              // Calculate the total price
              totalAmount += parseFloat(item.price.replace("$", "")) * item.quantity;
          });

          // Update the total price in the Total Price Box
          totalPriceBox.textContent = "$" + totalAmount.toFixed(2);
      } else {
          var noItemsMessage = document.createElement("li");
          noItemsMessage.textContent = "No items in the cart.";
          orderContent.appendChild(noItemsMessage);
      }
  } else {
      console.log("LocalStorage is not available.");
  }
});

// Add a click event listener to the cross button
document.getElementById("close-order").addEventListener("click", function () {
  // Redirect to index.html
  window.location.href = "index.html";
});
