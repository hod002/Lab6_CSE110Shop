// Script.js

window.addEventListener("DOMContentLoaded", () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      // Store data if not already in localStorage
      if (localStorage.getItem("productLength") == null) {
        for (let i = 0; i < data.length; i++) {
          localStorage.setItem(i, JSON.stringify(data[i]));
        }

        console.log("storing");
        localStorage.setItem("productLength", data.length);
      }

      // Check if cart is empty
      if (localStorage.getItem("cart") == null) {
        localStorage.setItem("cart", 0);
      } else {
        document.getElementById("cart-count").innerHTML = localStorage.getItem(
          "cart"
        );
      }

      // Create <product-item> for each product
      for (let i = 0; i < localStorage.getItem("productLength"); i++) {
        // childNode[1]: li -> li.childNode[1, 3, 5] -> img, p, p
        let pi = document.createElement("product-item");
        let product = JSON.parse(localStorage.getItem(i));

        pi.shadowRoot.childNodes[1].childNodes[1].setAttribute(
          "src",
          product.image
        );
        pi.shadowRoot.childNodes[1].childNodes[1].setAttribute(
          "alt",
          product.title
        );
        pi.shadowRoot.childNodes[1].childNodes[3].innerHTML = product.title;
        pi.shadowRoot.childNodes[1].childNodes[5].innerHTML = product.price;

        // Check if pi already in cart
        if (localStorage.getItem("product" + i) != null) {
          pi.shadowRoot.childNodes[1].childNodes[7].innerHTML =
            "Remove from Cart";
        }

        let pList = document.getElementById("product-list");
        pList.appendChild(pi);

        pi.shadowRoot.childNodes[1].childNodes[7].addEventListener(
          "click",
          function (e) {
            // Add to cart and local storage
            if (localStorage.getItem("product" + i) == null) {
              localStorage.setItem("product" + i, i);
              pi.shadowRoot.childNodes[1].childNodes[7].innerHTML =
                "Remove from Cart";
              localStorage.setItem(
                "cart",
                Number(Number(localStorage.getItem("cart")) + 1)
              );
            } else {
              // Item exists; remove item and decrement cart
              localStorage.removeItem("product" + i);
              pi.shadowRoot.childNodes[1].childNodes[7].innerHTML =
                "Add to Cart";
              localStorage.setItem(
                "cart",
                Number(Number(localStorage.getItem("cart")) - 1)
              );
            }

            document.getElementById(
              "cart-count"
            ).innerHTML = localStorage.getItem("cart");
          }
        );
        //console.log(pi.shadowRoot.childNodes[1].childNodes[7]);
      }
    });
});
