// Clase "molde" para los productos de nuestra aplicación
class Producto {
    constructor(id, nombre, descripcion, precio, categoria, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.categoria = categoria;
        this.imagen = imagen;
    }
}

// Clase para que simula la base de datos del e-commerce, acá van a estar
// todos los productos de nuestro catálogo
class BaseDeDatos {
    constructor() {
        // Array para el catálogo
        this.productos = [];
        this.cargarRegistros();
    }

    // Función asincrónica para cargar los productos desde un JSON
    async cargarRegistros() {
        const resultado = await fetch("./json/productos.json");
        this.productos = await resultado.json();
        cargarProductos(this.productos);
    }

    // Nos devuelve todo el catálogo de productos
    traerRegistros() {
        return this.productos;
    }

    // Nos devuelve un producto según el ID
    registroPorId(id) {
        return this.productos.find((producto) => producto.id === id);
    }

    // Nos devuelve un array con todas las coincidencias que encuentre según el
    // nombre del producto con la palabra que el pasemos como parámetro
    registrosPorNombre(palabra) {
        return this.productos.filter((producto) =>
            producto.descripcion.toLowerCase().includes(palabra.toLowerCase())
        );
    }
}
