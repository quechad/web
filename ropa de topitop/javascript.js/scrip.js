 // script.js

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona elementos del DOM
    const carritoIcono = document.getElementById('img-carrito');
    const carritoContainer = document.getElementById('carrito');
    const vaciarCarritoBtn = document.getElementById('Vaciar_Carrito');
    const agregarCarritoBtns = document.querySelectorAll('.agregar-carrito');
    const listaCarrito = document.querySelector('#lista-carrito tbody');
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-form input');
    const productsContainer = document.querySelector('.product-content');

    // Lista de productos (Ejemplo)
    const productos = [
        { id: 1, name: 'CAMISA PLAYERA HOMBRE', price: 's/.120', image: 'images/1.png' },
        { id: 2, name: 'CASACA IMPERMEABLE HOMBRE', price: 's/.250', image: 'images/2.png' },
        { id: 3, name: 'CASACA NEGRA MUJER', price: 's/.175', image: 'images/3.png' },
        { id: 4, name: 'CAMISA AZUL HOMBRE', price: 's/.140', image: 'images/4.png' },
        { id: 5, name: 'CAMISA NEGRA HOMBRE', price: 's/.150', image: 'images/5.png' },
        { id: 6, name: 'SACO AZUL MUJER', price: 's/.200', image: 'images/6.png' }
    ];

    // Muestra/oculta el carrito al pasar el ratón sobre el icono
    carritoIcono.addEventListener('mouseover', () => {
        carritoContainer.style.display = 'block';
    });
    
    carritoIcono.addEventListener('mouseout', () => {
        carritoContainer.style.display = 'none';
    });

    // Añadir productos al carrito
    agregarCarritoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = e.target.getAttribute('data-id');
            addProductToCart(productId);
        });
    });

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        clearCart();
    });

    // Función para añadir productos al carrito
    function addProductToCart(id) {
        const product = productos.find(p => p.id == id);

        if (product) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${product.image}" alt="${product.name}" style="width: 50px;"></td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td><a href="#" class="remove-product" data-id="${product.id}">Eliminar</a></td>
            `;
            listaCarrito.appendChild(row);

            // Añadir evento de eliminación para cada producto agregado
            row.querySelector('.remove-product').addEventListener('click', (e) => {
                e.preventDefault();
                row.remove();
            });
        }
    }

    // Función para vaciar el carrito
    function clearCart() {
        listaCarrito.innerHTML = '';
    }

    // Función para buscar productos
    function searchProducts(query) {
        const results = productos.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

        // Limpiar los productos existentes
        productsContainer.innerHTML = '';

        // Mostrar resultados
        results.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-txt">
                    <h3>${product.name}</h3>
                    <p>Calidad premium</p>
                    <p class="precio">${product.price}</p>
                    <a href="#" class="agregar-carrito btn-2" data-id="${product.id}">Agregar al carrito</a>
                </div>
            `;
            productsContainer.appendChild(productDiv);
        });

        // Volver a añadir el evento de agregar al carrito a los nuevos botones
        document.querySelectorAll('.agregar-carrito').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = e.target.getAttribute('data-id');
                addProductToCart(productId);
            });
        });
    }

    // Evento para el formulario de búsqueda
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        searchProducts(searchInput.value);
    });
});

    