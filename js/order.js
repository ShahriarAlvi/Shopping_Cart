// /js/order.js

// Create a mapping of product titles to IDs
const productTitleToIdMap = {
  "ITEM 1": 1,
  "ITEM 2": 2,
  "ITEM 3": 3,
  "ITEM 4": 4,
  "ITEM 5": 5,
  "ITEM 6": 6,
  "ITEM 7": 7,
  "ITEM 8": 8,
};

document.addEventListener("DOMContentLoaded", function () {
  // Check if localStorage is available in the browser
  if (typeof localStorage !== "undefined") {

    /* ------------- create an array of items to send to arduino -------- */

    // Retrieve the purchasedItems data from local storage
    var purchasedItems = JSON.parse(localStorage.getItem("purchasedItems"));

    // Create an array to store the IDs of purchased items
    var purchasedItemData = [];

    // Log the array of Data (for testing purposes)
    console.log("Array of IDs:", purchasedItemData);

    // Check if purchasedItems data is available
    if (purchasedItems && purchasedItems.length > 0) {
      // Loop through purchasedItems and add IDs to the array
      purchasedItems.forEach(function (item) {
        var productId = productTitleToIdMap[item.title];

        // testing title id
        // console.log(productTitleToIdMap[item.title]);

        if (productId) {
          // // Create an object with title, ID, and quantity
          // var itemData = {
          //   title: item.title,
          //   id: productId,
          //   quantity: item.quantity,
          // };

          purchasedItemData.push([productId, item.quantity]);
        }
      });

      // // testing array index access
      // for(var i = 0; i < purchasedItemData.length; i++){
      //   for(var j = 0; j < purchasedItemData[i].length; j++){
      //     console.log(purchasedItemData[i][j] + " ");
      //   }
      //   console.log("\n");
      // }

      /* --------------------- Order Confirmation -------------- */

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
      // Create a message for no items in the cart
      var orderContent = document.querySelector(".order-content");
      var noItemsMessage = document.createElement("div");
      noItemsMessage.textContent = "No items in the cart.";
      orderContent.appendChild(noItemsMessage);
    }

    /* ----------- Arduino connection established --------------- */

    // URL of the Arduino server
    const arduinoServerUrl = "http://arduino-server-ip:arduino-server-port";

    // Send the array of IDs to the Arduino server
    fetch(arduinoServerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchasedItemData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response from the Arduino if needed
        console.log("Response from Arduino:", data);
      })
      .catch((error) => {
        console.error("Error sending data to Arduino:", error);
      });

      /* ------------------ end of if (local storage != undefined) --------- */
  } else {
    console.log("LocalStorage is not available.");
  }

  /* ---------------------------------------------------------------------------- */

  var scrollButton = document.getElementById("show-stream-button");

  // Add a click event listener to the button
  scrollButton.addEventListener("click", function () {
    // Get the target section element
    var targetSection = document.getElementById("video-stream");

    // Scroll to the target section using smooth behavior
    targetSection.scrollIntoView({ behavior: "smooth" });
  });
});

/* -------------------   DOMContentLoaded addEventListener finished ------------------------------ */

// Add a click event listener to the cross button
document.getElementById("close-order").addEventListener("click", function () {
  // Redirect to index.html
  window.location.href = "index.html";
});
