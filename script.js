/* ---------------------------
   MOBILE MENU TOGGLE
----------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById("menu-icon");
    const navMenu = document.getElementById("nav-menu");

    if (menuIcon && navMenu) {
        menuIcon.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // Page load hote hi cart count update karein
    updateCartCount();
});

/* ---------------------------
   CART COUNT UPDATE (FIXED)
----------------------------*/
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    // Hamesha latest LocalStorage se data uthao taake data mismatch na ho
    let currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartCount) {
        cartCount.textContent = currentCart.length;
    }
}

/* ---------------------------
   ADD TO CART (INLINE BUTTONS)
   For: onclick="addToCart(this)"
----------------------------*/
function addToCart(buttonElement) {
    let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Mazboot selector jo alag-alag class names ko handle kar sake
    const card = buttonElement.closest(".dish-card") 
              || buttonElement.closest(".menu-card") 
              || buttonElement.closest(".card");

    if (!card) return;

    const nameEl = card.querySelector("h3");
    const priceEl = card.querySelector(".price");

    const name = nameEl ? nameEl.innerText.trim() : "Item";
    const price = priceEl ? priceEl.innerText.trim() : "$0.00";

    // Item add karein
    currentCart.push({ name, price });
    
    // Pehle LocalStorage mein save karein, phir count update karein
    localStorage.setItem("cart", JSON.stringify(currentCart));
    updateCartCount();

    // Agar user order page par hi mazeed items add kare toh summary khud refresh ho jaye
    if (typeof renderSummary === "function") {
        renderSummary();
    }

    alert(name + " added to cart successfully! 🎉");
}