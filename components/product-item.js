// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    // Create list
    shadowRoot.innerHTML = `
    <li class="product">
    <img src="" alt="" width=200>
    <p class="title"></p>
    <p class="price"></p>
    <button onclick="alert('Added to Cart!')">Add to Cart</button>
    </li>
    <style>@import "./styles/styles.css"</style>
    `;

    /* Link stylesheet
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "styles/styles.css");
    shadowRoot.appendChild(link);
    */
  }
}

customElements.define("product-item", ProductItem);
