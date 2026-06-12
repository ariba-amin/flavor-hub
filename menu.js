/* ---------------------------
   CART COUNT UPDATE
----------------------------*/
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    let currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartCount) {
        cartCount.textContent = currentCart.length;
    }
}

/* ---------------------------
   EVENT DELEGATION (CRASH PROOF)
----------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    // Initial count update
    updateCartCount();

    document.body.addEventListener("click", (e) => {
        const btn = e.target.closest(".add-btn");
        if (!btn) return;

        const card = btn.closest(".dish-card") 
                  || btn.closest(".menu-card") 
                  || btn.closest(".card")
                  || btn.parentElement; 

        if (!card) return;

        const nameEl = card.querySelector("h3");
        const priceEl = card.querySelector(".price");

        const name = nameEl ? nameEl.innerText.trim() : "Item";
        const price = priceEl ? priceEl.innerText.trim() : "$0.00";

        let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        currentCart.push({ name, price });
        
        localStorage.setItem("cart", JSON.stringify(currentCart));
        updateCartCount();

        alert(name + " added to cart! 🎉");
    });
});