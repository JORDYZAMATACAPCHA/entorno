// Base de datos de productos
const products = [
    {
        id: 1,
        name: "Laptop Gaming",
        price: 1200,
        emoji: "💻",
        description: "Laptop para gaming de alta gama"
    },
    {
        id: 2,
        name: "Smartphone",
        price: 800,
        emoji: "📱",
        description: "Último modelo de smartphone"
    },
    {
        id: 3,
        name: "Audífonos",
        price: 150,
        emoji: "🎧",
        description: "Audífonos inalámbricos premium"
    },
    {
        id: 4,
        name: "Smartwatch",
        price: 300,
        emoji: "⌚",
        description: "Reloj inteligente con GPS"
    },
    {
        id: 5,
        name: "Tablet",
        price: 500,
        emoji: "📱",
        description: "Tablet para trabajo y entretenimiento"
    },
    {
        id: 6,
        name: "Cámara",
        price: 700,
        emoji: "📷",
        description: "Cámara profesional DSLR"
    }
];

// Carrito de compras
let cart = [];
let total = 0;

// Elementos del DOM
const productGrid = document.getElementById('product-grid');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

// Cargar productos
function loadProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                ${product.emoji}
            </div>
            <h3 class="product-title">${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">$${product.price}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Agregar al Carrito
            </button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Agregar producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} agregado al carrito`);
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Actualizar cantidad
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Actualizar carrito
function updateCart() {
    cartItems.innerHTML = '';
    total = 0;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <span class="item-emoji">${item.emoji}</span>
                    <div>
                        <h4>${item.name}</h4>
                        <p>$${item.price} c/u</p>
                    </div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Eliminar</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    totalPrice.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Finalizar compra
function checkout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    const confirmPurchase = confirm(`¿Confirmar compra por $${total.toFixed(2)}?`);
    
    if (confirmPurchase) {
        alert('¡Compra realizada con éxito! Gracias por tu compra.');
        cart = [];
        updateCart();
    }
}

// Mostrar notificación
function showNotification(message) {
    // Crear notificación simple
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 1000;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event listeners
checkoutBtn.addEventListener('click', checkout);

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCart();
});