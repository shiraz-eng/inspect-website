const questions = document.querySelectorAll('.faq-question');

questions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const arrow = question.querySelector('.arrow');

        // Toggle visibility
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';

        // Rotate arrow
        if (answer.style.display === 'block') {
            arrow.style.transform = 'rotate(90deg)'; // Arrow points down
        } else {
            arrow.style.transform = 'rotate(0deg)'; // Arrow points right
        }
    });
});
const addToCartButtons = document.querySelectorAll('.cart-button');
        const cartItemsContainer = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
        const cartDiv = document.querySelector('.cart');
        const cartIcon = document.getElementById('cart-icon');
        const cartCount = document.getElementById('cart-count');

        // Store cart data in an array
        let cart = [];

        // Update cart display function
        function updateCart() {
            cartItemsContainer.innerHTML = '';
            let totalPrice = 0;
            
            cart.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <span style="flex-grow: 1;">${item.name} x ${item.quantity} - $${item.price * item.quantity}</span>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                `;
                cartItemsContainer.appendChild(itemDiv);
                totalPrice += item.price * item.quantity;
            });

            totalPriceElement.textContent = `Total: $${totalPrice}`;
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }

        // Add item to cart function
        function addToCart(productId, productName, productPrice, productImage) {
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }

            updateCart();
            cartDiv.style.display = 'block'; // Show cart when an item is added
        }

        // Remove item from cart function
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCart();
            if (cart.length === 0) {
                cartDiv.style.display = 'none'; // Hide cart if empty
            }
        }

        // Event listeners for 'Add to Cart' buttons
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productElement = event.target.closest('.product');
                const productId = parseInt(productElement.getAttribute('data-id'));
                const productName = productElement.querySelector('h3').textContent;
                const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));
                const productImage = productElement.querySelector('img').src;

                addToCart(productId, productName, productPrice, productImage);
            });
        });

        // Event listener for 'Remove' buttons in cart
        cartItemsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item')) {
                const productId = parseInt(event.target.getAttribute('data-id'));
                removeFromCart(productId);
            }
        });

        // Show cart when cart icon is clicked
        cartIcon.addEventListener('click', () => {
            cartDiv.style.display = (cartDiv.style.display === 'block') ? 'none' : 'block';
        });





