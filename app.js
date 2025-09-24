// Base de datos de productos
const products = [
    {
        id: 1,
        name: "Laptop Gaming",
        price: 1200,
        emoji: "💻",
        description: "Laptop para gaming de alta gama",
        image: "💻"
    },
    {
        id: 2,
        name: "Smartphone",
        price: 800,
        emoji: "📱",
        description: "Último modelo de smartphone",
        image: "📱"
    },
    {
        id: 3,
        name: "Audífonos",
        price: 150,
        emoji: "🎧",
        description: "Audífonos inalámbricos premium",
        image: "🎧"
    },
    {
        id: 4,
        name: "Smartwatch",
        price: 300,
        emoji: "⌚",
        description: "Reloj inteligente con GPS",
        image: "⌚"
    }
];

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
                ${product.image}
            </div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Agregar al Carrito
            </button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Agregar al carrito
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
    showNotification(`✅ ${product.name} agregado al carrito`);
}

// Eliminar del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('🗑️ Producto eliminado del carrito');
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
        cartItems.innerHTML = '<p class="empty-cart">🛒 Tu carrito está vacío</p>';
        document.getElementById('payment-section').style.display = 'none';
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
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Eliminar</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        document.getElementById('payment-section').style.display = 'block';
    }
    
    totalPrice.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Mostrar métodos de pago
function showPaymentMethods() {
    if (cart.length === 0) {
        showNotification('⚠️ Agrega productos al carrito primero');
        return;
    }

    const paymentModal = document.createElement('div');
    paymentModal.className = 'payment-modal';
    paymentModal.innerHTML = `
        <div class="payment-content">
            <h3>💳 Método de Pago</h3>
            <div class="payment-options">
                <label class="payment-option">
                    <input type="radio" name="payment" value="credit-card" checked>
                    💳 Tarjeta de Crédito
                </label>
                <label class="payment-option">
                    <input type="radio" name="payment" value="paypal">
                    📱 PayPal
                </label>
                <label class="payment-option">
                    <input type="radio" name="payment" value="cash">
                    💵 Efectivo
                </label>
            </div>
            
            <div id="credit-card-form" class="payment-form">
                <input type="text" placeholder="Número de tarjeta" class="form-input">
                <input type="text" placeholder="Nombre en la tarjeta" class="form-input">
                <div class="form-row">
                    <input type="text" placeholder="MM/AA" class="form-input small">
                    <input type="text" placeholder="CVV" class="form-input small">
                </div>
            </div>
            
            <div class="payment-total">
                <h4>Total a pagar: $${total.toFixed(2)}</h4>
            </div>
            
            <div class="payment-buttons">
                <button onclick="processPayment()" class="pay-btn">✅ Pagar Ahora</button>
                <button onclick="closePayment()" class="cancel-btn">❌ Cancelar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(paymentModal);
    
    // Cambiar formulario según método de pago
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            document.getElementById('credit-card-form').style.display = 
                this.value === 'credit-card' ? 'block' : 'none';
        });
    });
}

// Procesar pago
function processPayment() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    
    // Simular procesamiento de pago
    showNotification('⏳ Procesando pago...');
    
    setTimeout(() => {
        showNotification('✅ ¡Pago exitoso! Gracias por tu compra.');
        
        // Limpiar carrito
        cart = [];
        updateCart();
        closePayment();
        
        // Mostrar resumen
        setTimeout(() => {
            alert(`🎉 ¡Compra realizada con éxito!\n\nMétodo de pago: ${getPaymentMethodName(selectedPayment)}\nTotal: $${total.toFixed(2)}\n\nTu pedido llegará en 3-5 días.`);
        }, 1000);
    }, 2000);
}

function getPaymentMethodName(method) {
    const methods = {
        'credit-card': 'Tarjeta de Crédito',
        'paypal': 'PayPal',
        'cash': 'Efectivo'
    };
    return methods[method];
}

function closePayment() {
    const modal = document.querySelector('.payment-modal');
    if (modal) modal.remove();
}

// Notificación
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCart();
    
    checkoutBtn.addEventListener('click', showPaymentMethods);
});