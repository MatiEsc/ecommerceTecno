// Elementos
const spanCantidadProductos = document.querySelector("#cantidadProductos");
const spanTotalCarrito = document.querySelector("#totalCarrito");
const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito");
const inputBuscar = document.querySelector("#inputBuscar");
const enlacePromociones = document.getElementById("promocionesBancarias");
const ventana = document.getElementById("ventana");
const cerrarVentana = document.getElementById("cerrarVentana");
const enlacesCategorias = document.querySelectorAll(".nav-link");

// Instanciamos la base de datos
const bd = new BaseDeDatos();

// Instaciamos la clase Carrito
const carrito = new Carrito();

// Mostramos el catálogo de la base de datos apenas carga la página
cargarProductos(bd.traerRegistros());

// Función para mostrar para renderizar productos del catálogo o buscador
function cargarProductos(productos) {
    // Vacíamos el div
    divProductos.innerHTML = "";
    // Recorremos producto por producto y lo dibujamos en el HTML
    for (const producto of productos) {
        divProductos.innerHTML += `



                <div class="card " style="width: 18rem;">
                    <img src="${producto.imagen}" class="card-img-top"  alt="${producto.nombre}>
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="precio">$${producto.precio}</p>
                        <a href="#" class="btnAmpliar btn btn-primary" data-imagen="${producto.imagen}">Ampliar</a>
                        <a href="#" class="btnAgregar btn btn-primary" data-id="${producto.id}">Agregar al carrito</a>
                        
                    </div>
                </div>

            `;
    }

    // Lista dinámica con todos los botones que haya en nuestro catálogo
    const botonesAgregar = document.querySelectorAll(".btnAgregar");
    const botonesAmpliar = document.querySelectorAll(".btnAmpliar");

    // Recorremos botón por botón de cada producto en el catálogo y le agregamos
    // el evento click a cada uno
    for (const boton of botonesAgregar) {
        boton.addEventListener("click", (event) => {
            // Evita el comportamiento default de HTML
            event.preventDefault();
            // Guardo el dataset ID que está en el HTML del botón Agregar al carrito
            const idProducto = Number(boton.dataset.id);
            // Uso el método de la base de datos para ubicar el producto según el ID
            const producto = bd.registroPorId(idProducto);
            // Llama al método agregar del carrito
            carrito.agregar(producto);
            // Toastify
            Toastify({
                text: `Se ha añadido ${producto.categoria} al carrito`,
                gravity: "bottom",
                position: "center",
                className: "info",
                style: {
                    background:
                        "linear-gradient(to right, #440099, #1E90FF, #00D4FF, #00D4FF, #1E90FF, #440099)",
                },
            }).showToast();
        });
    }
    for (const boton of botonesAmpliar) {
        boton.addEventListener("click", (event) => {
            //Evita el comportamiento default del html
            event.preventDefault();

            Swal.fire({
                imageUrl: boton.dataset.imagen,
                imageHeight: 500,
                imageAlt: "Imagen ampliada",
            });
        });
    }
}

// Buscador
inputBuscar.addEventListener("input", (event) => {
    event.preventDefault();
    const palabra = inputBuscar.value;
    const productos = bd.registrosPorNombre(palabra);
    cargarProductos(productos);
});

// Abre el ventana cuando se hace clic en "Ver promociones"
enlacePromociones.addEventListener("click", () => {
    ventana.style.display = "block";
});

// Cierra el ventana cuando se hace clic en el botón de cerrar
cerrarVentana.addEventListener("click", () => {
    ventana.style.display = "none";
});

//Enlaces por categorias
enlacesCategorias.forEach((enlace) => {
    enlace.addEventListener("click", (event) => {
        event.preventDefault();
        const categoria = event.target.dataset.categoria;
        //quitar seleccionado anterior
        const enlaceSeleccionado = document.querySelector(".seleccionado");
        enlaceSeleccionado.classList.remove("seleccionado");
        //Se lo agrega al enlace
        enlace.classList.add("seleccionado");
        if (categoria === "completo") {
            cargarProductos(bd.productos);
        } else {
            filtrarPorCategoria(categoria);
        }
    });
});

//Funcion para filtrar por categoria
function filtrarPorCategoria(categoria) {
    const productosFiltrados = bd.productos.filter(
        (producto) => producto.categoria.toLowerCase() === categoria.toLowerCase()
    );
    //llama a la funcion para mostrar los productos en la pagina
    cargarProductos(productosFiltrados);
}
