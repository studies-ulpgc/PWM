function initHome() {
    // Aquí cargamos los productos
    const productoTemplate = document.querySelector('#producto-template');
    const container = document.getElementById('productos-container');
    
    // Datos simulados (o vendrían de una API)
    const productos = [
        { id: 1, imagen: 'img/producto1.jpg', titulo: 'Producto 1', precio: '10€' },
        { id: 2, imagen: 'img/producto2.jpg', titulo: 'Producto 2', precio: '20€' }
        // más productos...
    ];
    
    productos.forEach(producto => {
        const clone = productoTemplate.content.cloneNode(true);
        clone.querySelector('.producto-imagen').src = producto.imagen;
        clone.querySelector('.producto-titulo').textContent = producto.titulo;
        clone.querySelector('.producto-precio').textContent = producto.precio;
        container.appendChild(clone);
    });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initHome);