// Variables globales
let cart = [];
let cartCount = 0;
let totalPrice = 0;
let wishlist = [];

// Datos de productos
const products = [
    {
        id: 1,
        name: "Smartphone Pro Max",
        category: "smartphone",
        description: "Pantalla 6.7\", 256GB, Cámara Triple 48MP",
        price: 899.99,
        originalPrice: 999.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.5,
        reviews: 128,
        badge: "Nuevo"
    },
    {
        id: 2,
        name: "Laptop UltraSlim",
        category: "laptop",
        description: "Intel i7, 16GB RAM, SSD 512GB, 14\"",
        price: 1299.99,
        originalPrice: 1499.99,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.0,
        reviews: 95,
        badge: "Oferta"
    },
    {
        id: 3,
        name: "Tablet Pro",
        category: "tablet",
        description: "Pantalla 11\", 128GB, Stylus incluido",
        price: 749.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 5.0,
        reviews: 204,
        badge: null
    },
    {
        id: 4,
        name: "Auriculares Premium",
        category: "audio",
        description: "Cancelación de ruido, 30h batería",
        price: 299.99,
        originalPrice: 349.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.5,
        reviews: 156,
        badge: "Popular"
    },
    {
        id: 5,
        name: "Smart Watch Pro",
        category: "wearable",
        description: "Monitoreo de salud, GPS, resistencia al agua",
        price: 249.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.0,
        reviews: 89,
        badge: "Nuevo"
    },
    {
        id: 6,
        name: "Laptop Gaming",
        category: "laptop",
        description: "RTX 4060, Intel i9, 32GB RAM, 1TB SSD",
        price: 1899.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.5,
        reviews: 67,
        badge: null
    },
    {
        id: 7,
        name: "Altavoz Bluetooth",
        category: "audio",
        description: "360° sonido, 20h batería, resistente al agua",
        price: 129.99,
        originalPrice: 159.99,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 5.0,
        reviews: 312,
        badge: "Oferta"
    },
    {
        id: 8,
        name: "Smartphone Compact",
        category: "smartphone",
        description: "Pantalla 6.1\", 128GB, Doble cámara 64MP",
        price: 599.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 3.5,
        reviews: 76,
        badge: null
    }
];

// Elementos del DOM
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.querySelector('.cart-count');
const cartTotalPriceElement = document.getElementById('cart-total-price');
const modal = document.getElementById('quickViewModal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const modalAddToCart = document.getElementById('modal-add-to-cart');
const productsGrid = document.querySelector('.products-grid');

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos desde localStorage
    loadCartFromStorage();
    loadWishlistFromStorage();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Generar productos
    generateProducts();
    
    // Actualizar la interfaz
    updateCartUI();
    updateWishlistUI();
    
    // Iniciar contador de ofertas
    startCountdown();
    
    // Configurar filtros de productos
    setupProductFilters();
    
    // Configurar FAQ
    setupFAQ();
});

// Generar productos en el grid
function generateProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);
        
        const discount = product.originalPrice ? 
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
        
        const stars = generateStars(product.rating);
        
        productCard.innerHTML = `
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <div class="product-actions">
                        <button class="btn-action btn-quick-view" data-id="${product.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action btn-wishlist" data-id="${product.id}">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `
                        <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                        <span class="discount">-${discount}%</span>
                    ` : ''}
                </div>
                <button class="btn-add-to-cart" 
                        data-id="${product.id}" 
                        data-name="${product.name}" 
                        data-price="${product.price}">
                    Añadir al Carrito
                </button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Generar estrellas de rating
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Configurar todos los event listeners
function setupEventListeners() {
    // Botones de añadir al carrito (delegación de eventos)
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-add-to-cart')) {
            addToCart(event);
        }
    });
    
    // Botones de vista rápida
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-quick-view') || 
            event.target.closest('.btn-quick-view')) {
            const btn = event.target.classList.contains('btn-quick-view') ? 
                event.target : event.target.closest('.btn-quick-view');
            openQuickView(btn.getAttribute('data-id'));
        }
    });
    
    // Botones de lista de deseos
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-wishlist') || 
            event.target.closest('.btn-wishlist')) {
            const btn = event.target.classList.contains('btn-wishlist') ? 
                event.target : event.target.closest('.btn-wishlist');
            toggleWishlist(btn.getAttribute('data-id'));
        }
    });
    
    // Cerrar modal
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Abrir/cerrar carrito
    document.querySelector('.cart-icon').addEventListener('click', openCart);
    document.querySelector('.close-cart').addEventListener('click', closeCart);
    
    // Procesar pago
    document.querySelector('.btn-checkout').addEventListener('click', processCheckout);
    
    // Menú hamburguesa para móviles
    document.querySelector('.hamburger').addEventListener('click', toggleMobileMenu);
    
    // Formulario de newsletter
    document.querySelector('.newsletter-form').addEventListener('submit', handleNewsletter);
    
    // Formulario de contacto
    document.getElementById('contactForm').addEventListener('submit', handleContact);
    
    // Efectos de scroll para elementos
    window.addEventListener('scroll', handleScrollAnimations);
}

// Configurar filtros de productos
function setupProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            // Filtrar productos
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
}

// Configurar FAQ
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Cerrar otros items abiertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar el item actual
            item.classList.toggle('active');
        });
    });
}

// Filtrar productos por categoría
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = 'block';
            // Animación de aparición
            setTimeout(() => {
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
            }, 100);
        } else {
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
            setTimeout(() => {
                product.style.display = 'none';
            }, 300);
        }
    });
}

// Función para abrir vista rápida del producto
function openQuickView(productId) {
    const product = products.find(p => p.id == productId);
    
    if (!product) return;
    
    modalImg.src = product.image;
    modalTitle.textContent = product.name;
    modalDescription.textContent = product.description;
    
    const stars = generateStars(product.rating);
    const ratingHTML = `
        <div class="product-rating">
            <div class="stars">${stars}</div>
            <span class="rating-count">(${product.reviews})</span>
        </div>
    `;
    
    modalPrice.innerHTML = `
        <div class="product-price">
            <span class="current-price">$${product.price.toFixed(2)}</span>
            ${product.originalPrice ? `
                <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
            ` : ''}
        </div>
        ${ratingHTML}
    `;
    
    // Configurar el botón de añadir al carrito en el modal
    modalAddToCart.setAttribute('data-id', product.id);
    modalAddToCart.setAttribute('data-name', product.name);
    modalAddToCart.setAttribute('data-price', product.price);
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Función para añadir producto al carrito
function addToCart(event) {
    const button = event.target;
    const id = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    // Actualizar contador y total
    cartCount += 1;
    totalPrice += price;
    
    // Actualizar la interfaz
    updateCartUI();
    
    // Guardar en localStorage
    saveCartToStorage();
    
    // Mostrar notificación
    showNotification(`¡${name} añadido al carrito!`);
    
    // Abrir el carrito si se añade desde el modal
    if (event.target === modalAddToCart) {
        closeModal();
        openCart();
    }
}

// Función para actualizar la interfaz del carrito
function updateCartUI() {
    // Actualizar contador
    cartCountElement.textContent = cartCount;
    
    // Actualizar items del carrito
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
    } else {
        cart.forEach(item => {
            const product = products.find(p => p.id == item.id);
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${product.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        // Añadir event listeners a los botones de cantidad y eliminar
        document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.quantity-btn.increase').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }
    
    // Actualizar precio total
    cartTotalPriceElement.textContent = totalPrice.toFixed(2);
}

// Función para aumentar la cantidad de un producto
function increaseQuantity(event) {
    const id = event.target.getAttribute('data-id');
    const item = cart.find(item => item.id === id);
    
    if (item) {
        item.quantity += 1;
        cartCount += 1;
        totalPrice += item.price;
        updateCartUI();
        saveCartToStorage();
    }
}

// Función para disminuir la cantidad de un producto
function decreaseQuantity(event) {
    const id = event.target.getAttribute('data-id');
    const item = cart.find(item => item.id === id);
    
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        cartCount -= 1;
        totalPrice -= item.price;
        updateCartUI();
        saveCartToStorage();
    }
}

// Función para eliminar un producto del carrito
function removeItem(event) {
    const id = event.target.closest('.remove-item').getAttribute('data-id');
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        cartCount -= item.quantity;
        totalPrice -= item.price * item.quantity;
        cart.splice(itemIndex, 1);
        updateCartUI();
        saveCartToStorage();
        
        // Mostrar notificación
        showNotification(`¡${item.name} eliminado del carrito!`);
    }
}

// Función para abrir el carrito
function openCart() {
    cartSidebar.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el carrito
function closeCart() {
    cartSidebar.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Función para procesar el pago
function processCheckout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Añade algunos productos antes de proceder al pago.');
        return;
    }
    
    // Simular proceso de pago
    alert(`¡Gracias por tu compra! Total: $${totalPrice.toFixed(2)}\n\nTu pedido ha sido procesado correctamente.`);
    
    // Vaciar carrito
    cart = [];
    cartCount = 0;
    totalPrice = 0;
    updateCartUI();
    saveCartToStorage();
    closeCart();
    
    // Mostrar notificación
    showNotification('¡Compra realizada con éxito!');
}

// Funcionalidad de lista de deseos
function toggleWishlist(productId) {
    const product = products.find(p => p.id == productId);
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    const wishlistButtons = document.querySelectorAll(`.btn-wishlist[data-id="${productId}"]`);
    
    if (existingIndex !== -1) {
        // Remover de la lista de deseos
        wishlist.splice(existingIndex, 1);
        wishlistButtons.forEach(btn => {
            btn.innerHTML = '<i class="far fa-heart"></i>';
            btn.style.color = '';
        });
        showNotification(`¡${product.name} removido de tu lista de deseos!`);
    } else {
        // Añadir a la lista de deseos
        wishlist.push({
            id: productId,
            name: product.name
        });
        wishlistButtons.forEach(btn => {
            btn.innerHTML = '<i class="fas fa-heart"></i>';
            btn.style.color = '#e74c3c';
        });
        showNotification(`¡${product.name} añadido a tu lista de deseos!`);
    }
    
    // Guardar en localStorage
    saveWishlistToStorage();
}

// Actualizar interfaz de lista de deseos
function updateWishlistUI() {
    // Actualizar botones de lista de deseos según los productos guardados
    document.querySelectorAll('.btn-wishlist').forEach(button => {
        const productId = button.getAttribute('data-id');
        
        const isInWishlist = wishlist.some(item => item.id === productId);
        
        if (isInWishlist) {
            button.innerHTML = '<i class="fas fa-heart"></i>';
            button.style.color = '#e74c3c';
        } else {
            button.innerHTML = '<i class="far fa-heart"></i>';
            button.style.color = '';
        }
    });
}

// Función para mostrar notificaciones
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1300;
        transform: translateX(150%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar y eliminar notificación después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Contador de ofertas
function startCountdown() {
    // Establecer fecha de finalización (3 días desde ahora)
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 3);
    
    // Actualizar el contador cada segundo
    const countdownFunction = setInterval(function() {
        // Obtener fecha y hora actual
        const now = new Date().getTime();
        
        // Calcular la diferencia entre ahora y la fecha de finalización
        const distance = countDownDate - now;
        
        // Cálculos de tiempo para días, horas, minutos y segundos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Mostrar el resultado en los elementos correspondientes
        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
        
        // Si el contador llega a cero, detenerlo
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.querySelector(".countdown").innerHTML = "¡La oferta ha terminado!";
        }
    }, 1000);
}

// Manejar suscripción al newsletter
function handleNewsletter(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('.newsletter-input');
    const email = emailInput.value;
    
    if (email) {
        // Simular envío de formulario
        showNotification('¡Gracias por suscribirte a nuestro newsletter!');
        emailInput.value = '';
    }
}

// Manejar formulario de contacto
function handleContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simular envío de formulario
    showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.');
    
    // Limpiar formulario
    event.target.reset();
}

// Animaciones al hacer scroll
function handleScrollAnimations() {
    const scrollPosition = window.scrollY;
    
    // Efecto de aparición para elementos
    const animatedElements = document.querySelectorAll('.product-card, .feature-item, .testimonial-card, .category-card, .gallery-item');
    
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top + scrollPosition;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition > elementPosition - windowHeight + 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Función para alternar el menú móvil
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Guardar carrito en localStorage
function saveCartToStorage() {
    const cartData = {
        items: cart,
        count: cartCount,
        total: totalPrice
    };
    localStorage.setItem('techstore_cart', JSON.stringify(cartData));
}

// Cargar carrito desde localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('techstore_cart');
    
    if (savedCart) {
        const cartData = JSON.parse(savedCart);
        cart = cartData.items || [];
        cartCount = cartData.count || 0;
        totalPrice = cartData.total || 0;
    }
}

// Guardar lista de deseos en localStorage
function saveWishlistToStorage() {
    localStorage.setItem('techstore_wishlist', JSON.stringify(wishlist));
}

// Cargar lista de deseos desde localStorage
function loadWishlistFromStorage() {
    const savedWishlist = localStorage.getItem('techstore_wishlist');
    
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }
}

// Inicializar elementos con animación
document.querySelectorAll('.product-card, .feature-item, .testimonial-card, .category-card, .gallery-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Disparar evento scroll para activar animaciones al cargar
setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
}, 100);