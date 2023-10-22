// Función para obtener los datos del clima basados en la ubicación
async function obtenerClima(ciudad) {
    const apiKey = "fd85695d203e03ccf31e44d082f19948";
    try {
        const response = await fetch(
            `http://api.weatherstack.com/current?access_key=${apiKey}&query=${ciudad}`
        );
        const data = await response.json();
        const temperatura = data.current.temperature;
        const temperaturaElement = document.getElementById("temperatura");

        temperaturaElement.textContent = ` ${temperatura}°C`;
    } catch (error) {
        console.error("Error al obtener la información del clima", error);
    }
}

// Función para obtener la ubicación del usuario basada en su IP utilizando ip-api.com
async function obtenerUbicacion() {
    try {
        const response = await fetch("http://ip-api.com/json");
        const data = await response.json();
        const ubicacion = data.city + ", " + data.regionName;
        const ubicacionInfo = document.getElementById("ubicacionInfo");
        ubicacionInfo.textContent = ` ${ubicacion}`;
        // Llamar a la función para obtener datos del clima basados en la ubicación
        obtenerClima(data.city);
    } catch (error) {
        console.error("Error al obtener la ubicación del usuario", error);
    }
}

// Llamar a la función para obtener la ubicación y el clima al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    obtenerUbicacion();
});
