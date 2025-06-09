// Responsive Navbar Toggle
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

// --- Start of Contact Form Tracking Code ---


document.addEventListener('DOMContentLoaded', function() {
    // These lines to get elements should be part of the form submission handling
    // However, ensure your HTML input elements have these specific IDs.
    // Based on contact.html, the input fields don't have IDs like 'name', 'email', 'inquiry_category'.
    // You will need to add IDs to your input fields for these lines to work:
    // <input type="text" placeholder="Enter your name" id="name">
    // <input type="text" placeholder="Enter your Email" id="email">
    // <input type="text" placeholder="Enter your Subjext" id="inquiry_category"> (or a select dropdown for category)
    // <textarea name="" id="message" cols="30" rows="10" placeholder="Your Message"></textarea>

    let Nameval = document.getElementById('name');
    let Emailval = document.getElementById('email');
    let Inq_cat = document.getElementById('inquiry_category'); // This input is for 'Subject' in your HTML. Consider renaming ID or parameter name if needed.
    let Messageval = document.getElementById('message');

    const contactForm = document.getElementById('contactForm'); // Your form's ID

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevents default form submission, which might be handled by an AJAX call or redirected later.

            // The console.log is for debugging and can be removed in production
            if (Nameval && Emailval && Inq_cat && Messageval) { // Check if elements exist before accessing .value
                console.log(Nameval.value, Emailval.value, Inq_cat.value, Messageval.value);
            }

            let charactersInMessage = Messageval ? Messageval.value.length : 0; // Check if Messageval exists

            gtag('event', 'contact_form_submit', {
                inquiry_category: Inq_cat ? Inq_cat.value : 'N/A', // Send inquiry category if element exists
                characters_in_message: charactersInMessage,
                submission_count: 1, // Static parameter, indicating one submission
                form_id: 'contactForm', // ID of the form
                form_name: 'Contact Us Form', // Descriptive name for the form
                page_location: window.location.href // Current page URL
            });

            // If your form submits normally (not via AJAX) and redirects,
            // you might need to re-submit the form after the gtag call:
            // contactForm.submit();
            // Or ensure your backend logic handles the redirect after successful submission,
            // giving gtag enough time to send the hit.

            // If your form uses AJAX, you would typically trigger this gtag call
            // upon a successful AJAX response to confirm submission.
        });
    }
});
// --- End of Contact Form Tracking Code ---

// --- Start of Checkout Purchase Tracking Code ---
document.addEventListener('DOMContentLoaded', function() {
    // Ensure this runs only on the cart page (or the page where checkout button is clicked)
    if (document.getElementById('cart-page')) { // Your <body> has id="cart-page"
        const checkoutButton = document.querySelector('#subtotal .checkout-btn'); // Get the checkout button

        if (checkoutButton) {
            checkoutButton.addEventListener('click', function(event) {
                // Prevent default behavior if this button is part of an AJAX submission
                // event.preventDefault();

                // Ensure the 'cart' object is available from script.js
                if (typeof cart === 'undefined' || Object.keys(cart).length === 0) {
                    console.warn("Cart is empty or not available. Cannot send purchase event.");
                    return;
                }

                let purchaseItems = [];
                for (const productId in cart) {
                    const item = cart[productId];
                    purchaseItems.push({
                        item_id: item.id,
                        item_name: item.name,
                        item_brand: item.brand,
                        price: item.price,
                        quantity: item.quantity
                    });
                }

                // Get totals from your displayed cart
                const subtotalElement = document.getElementById('cart-subtotal');
                const shippingElement = document.getElementById('cart-shipping');
                const grandTotalElement = document.getElementById('cart-grand-total');

                const subtotal = parseFloat(subtotalElement ? subtotalElement.textContent.replace('$', '') : 0);
                const shipping = parseFloat(shippingElement ? shippingElement.textContent.replace('$', '') : 0);
                const grandTotal = parseFloat(grandTotalElement ? grandTotalElement.textContent.replace('$', '') : 0);

                // IMPORTANT: Replace 'INR' with your actual currency code (e.g., 'USD', 'EUR')
                // IMPORTANT: transaction_id should ideally come from your backend after a successful order.
                // The current Date.now() + random is a placeholder for client-side testing.
                gtag('event', 'purchase', {
                    transaction_id: 'T_' + Date.now() + Math.floor(Math.random() * 1000), // Placeholder: replace with actual unique order ID from backend
                    value: grandTotal, // Total value of the purchase
                    currency: 'INR', // <--- REPLACE THIS WITH YOUR CURRENCY CODE (e.g., 'USD', 'EUR')
                    tax: (grandTotal - subtotal - shipping), // Calculated tax (approx)
                    shipping: shipping, // Shipping cost
                    items: purchaseItems // Array of purchased items
                });

                // If clicking 'Proceed to checkout' redirects to a payment gateway,
                // the actual 'purchase' event is often best placed on the final 'Thank You' or 'Order Confirmation' page.
                // If it's the final action on this page, ensure the gtag call is robust enough to send before navigation.
            });
        }
    }
});
// --- End of Checkout Purchase Tracking Code ---

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Back to Top button functionality
const toTop = document.querySelector(".to-top");
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
});


// Products Data (for Shop and Index pages)
const products = [
    {
        id: 'f1',
        img: 'img/products/f1.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'f2',
        img: 'img/products/f2.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'f3',
        img: 'img/products/f3.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'f4',
        img: 'img/products/f4.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'f5',
        img: 'img/products/f5.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'f6',
        img: 'img/products/f6.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'f7',
        img: 'img/products/f7.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'f8',
        img: 'img/products/f8.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'n1',
        img: 'img/products/n1.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'n2',
        img: 'img/products/n2.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'n3',
        img: 'img/products/n3.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'n4',
        img: 'img/products/n4.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'n5',
        img: 'img/products/n5.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'n6',
        img: 'img/products/n6.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'n7',
        img: 'img/products/n7.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'n8',
        img: 'img/products/n8.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || {};
let couponApplied = false; // Variable to track coupon status

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
    // Re-render cart table if on the cart page to reflect changes immediately
    if (document.getElementById('cart-table-body')) { //
        renderCartTable();
    }
}

function updateCartIcon() {
    const cartIcon = document.querySelector('#lg-bag a');
    if (cartIcon) {
        const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
        let badge = cartIcon.querySelector('.cart-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.classList.add('cart-badge');
            cartIcon.appendChild(badge);
        }
        badge.textContent = totalItems;
        badge.style.cssText = `
            position: absolute;
            top: -10px;
            right: -10px;
            background-color: red;
            color: white;
            border-radius: 50%;
            padding: 2px 6px;
            font-size: 12px;
        `;
        badge.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        if (cart[productId]) {
            cart[productId].quantity++;
        } else {
            cart[productId] = { ...product, quantity: 1 };
        }
        saveCart();
    }
}

function removeFromCart(productId) {
    if (cart[productId]) {
        delete cart[productId];
        saveCart();
        renderCartTable(); // Ensure the table is re-rendered after removal
    }
}

function updateCartQuantity(productId, quantity) {
    if (cart[productId]) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            cart[productId].quantity = quantity;
            saveCart();
            renderCartTable(); // Ensure the table is re-rendered after quantity update
        }
    }
}

function renderCartTable() {
    const cartTableBody = document.querySelector('#cart-table-body'); //
    const cartSubtotalElement = document.getElementById('cart-subtotal'); //
    const cartShippingElement = document.getElementById('cart-shipping'); //
    const cartTotalElement = document.getElementById('cart-grand-total'); //

    if (!cartTableBody || !cartSubtotalElement || !cartShippingElement || !cartTotalElement) return;

    cartTableBody.innerHTML = '';
    let subtotal = 0;

    for (const productId in cart) {
        const item = cart[productId];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" class="remove-item-btn" data-product-id="${item.id}"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${item.img}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1" class="cart-quantity-input" data-product-id="${item.id}"></td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartTableBody.appendChild(row);
        subtotal += item.price * item.quantity;
    }

    const shipping = subtotal > 0 ? 15.00 : 0.00; // Example shipping cost
    let total = subtotal + shipping;

    // Apply coupon discount if active
    if (couponApplied) {
        total *= 0.50; // 50% off
    }

    cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    cartShippingElement.textContent = `$${shipping.toFixed(2)}`;
    cartTotalElement.textContent = `$${total.toFixed(2)}`;

    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = event.currentTarget.dataset.productId;
            removeFromCart(productId);
        });
    });

    // Add event listeners for quantity inputs
    document.querySelectorAll('.cart-quantity-input').forEach(input => {
        input.addEventListener('change', (event) => {
            const productId = event.currentTarget.dataset.productId;
            const newQuantity = parseInt(event.currentTarget.value);
            updateCartQuantity(productId, newQuantity);
        });
    });
}

// Function to apply coupon
function applyCoupon() {
    const couponInput = document.getElementById('coupon-input'); // Get the coupon input field
    if (!couponInput) return; // Exit if element not found

    const couponCode = couponInput.value.trim().toUpperCase(); // Get and format the entered code

    if (couponCode === 'CODE50') {
        couponApplied = true; // Set coupon status to true
        alert('Coupon "CODE50" applied! You get 50% off.'); // Inform the user
    } else {
        couponApplied = false; // Reset coupon status if invalid
        alert('Invalid coupon code. Please try again.'); // Inform the user
    }
    saveCart(); // Re-save cart and re-render table to reflect discount
}

// Function to render products on index and shop pages
function renderProducts(containerId, productList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    productList.forEach(product => {
        const proDiv = document.createElement('div');
        proDiv.classList.add('pro');
        proDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="des">
                <span>${product.brand}</span>
                <h5>${product.name}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>$${product.price.toFixed(2)}</h4>
            </div>
            <a href="#" class="add-to-cart-btn" data-product-id="${product.id}"><i class="fa-sharp fa-solid fa-cart-shopping"></i></a>
        `;
        container.appendChild(proDiv);
    });

    // Add event listeners for "add to cart" buttons
    document.querySelectorAll(`#${containerId} .add-to-cart-btn`).forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = event.currentTarget.dataset.productId;
            addToCart(productId);
        });
    });
}

// Blog Posts Data
const blogPosts = [
    {
        id: 'blog1',
        img: 'img/blog/b1.jpg',
        title: 'The Cotton-Blend Sweatshirt',
        snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed dignissimos exercitationem voluptatem quod earum dicta provident nam iure libero odit!',
        date: '13/01',
        link: 'sblog.html?blogId=blog1' // Example link to a single blog post page
    },
    {
        id: 'blog2',
        img: 'img/blog/b2.jpg',
        title: 'How To Style a Quiff',
        snippet: 'Discover the secrets to styling a perfect quiff, from product selection to technique, for a timeless look.',
        date: '15/02',
        link: 'sblog.html?blogId=blog2'
    },
    {
        id: 'blog3',
        img: 'img/blog/b3.jpg',
        title: 'Must-Have Accessories for Every Man',
        snippet: 'Elevate your style with these essential accessories that every man should own, from watches to belts.',
        date: '20/03',
        link: 'sblog.html?blogId=blog3'
    },
    {
        id: 'blog4',
        img: 'img/blog/b4.jpg',
        title: 'A Guide to Picking the Right Jeans',
        snippet: 'From slim fit to relaxed, find out how to choose the perfect pair of jeans that flatter your body type.',
        date: '01/04',
        link: 'sblog.html?blogId=blog4'
    },
    {
        id: 'blog5',
        img: 'img/blog/b5.jpg',
        title: 'The Ultimate Sneaker Care Guide',
        snippet: 'Keep your sneakers looking fresh and new with these simple tips for cleaning and maintenance.',
        date: '10/05',
        link: 'sblog.html?blogId=blog5'
    },
    {
        id: 'blog6',
        img: 'img/blog/b6.jpg',
        title: 'Spring Fashion Trends 2023',
        snippet: 'Stay ahead of the curve with our breakdown of the hottest spring fashion trends for the upcoming season.',
        date: '25/05',
        link: 'sblog.html?blogId=blog6'
    }
];

// Function to render blog posts on the blog page
function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-container'); //
    if (!blogContainer) return;

    blogContainer.innerHTML = ''; // Clear existing content

    blogPosts.forEach(post => {
        const blogBox = document.createElement('div');
        blogBox.classList.add('blog-box');
        blogBox.innerHTML = `
            <div class="blog-img">
                <img src="${post.img}" alt="${post.title}">
            </div>
            <div class="blog-details">
                <h4>${post.title}</h4>
                <p>${post.snippet}</p>
                <a href="${post.link || '#'}">CONTINUE READING</a>
            </div>
            <h1>${post.date}</h1>
        `;
        blogContainer.appendChild(blogBox);
    });
}

// Initial calls based on the current page
document.addEventListener('DOMContentLoaded', () => {
    // For index.html
    if (document.getElementById('product-container-featured')) { //
        renderProducts('product-container-featured', products.slice(0, 8));
    }
    if (document.getElementById('product-container-new-arrivals')) { //
        renderProducts('product-container-new-arrivals', products.slice(8, 16));
    }

    // For shop.html
    if (document.getElementById('shop-product-container')) { //
        renderProducts('shop-product-container', products);
    }

    // For cart.html
    if (document.getElementById('cart-table-body')) { // Corrected ID from 'cart-table'
        renderCartTable();
        // Add event listener for coupon button only on the cart page
        const applyCouponBtn = document.querySelector('#coupon button'); //
        if (applyCouponBtn) {
            // Find the input field within the #coupon div and assign it the correct ID
            const couponInput = document.querySelector('#coupon input');
            if (couponInput) {
                couponInput.id = 'coupon-input';
            }
            applyCouponBtn.addEventListener('click', applyCoupon);
        }
    }

    // For blog.html
    if (document.getElementById('blog-container')) { //
        loadBlogPosts();
    }

    updateCartIcon(); // Update cart icon on all pages on load
});
