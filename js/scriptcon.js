document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("mapa")) {
        iniciarMapa();
    }
});

function iniciarMapa() {
    var ubicacionNegocio = [40.4168, -3.7038]; // Madrid, España (ejemplo)

    // Inicializar el mapa centrado en la tienda
    var map = L.map("mapa").setView(ubicacionNegocio, 13);

    // Cargar tiles de OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Añadir marcador del negocio
    var markerNegocio = L.marker(ubicacionNegocio).addTo(map)
        .bindPopup("El Oso Verde - Nuestra Tienda").openPopup();

    // Intentar obtener la ubicación del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var ubicacionUsuario = [position.coords.latitude, position.coords.longitude];

                // Añadir marcador del usuario
                var markerUsuario = L.marker(ubicacionUsuario).addTo(map)
                    .bindPopup("Tu ubicación").openPopup();

                // Dibujar la línea entre la tienda y el usuario
                L.polyline([ubicacionNegocio, ubicacionUsuario], {
                    color: "blue",
                    weight: 4,
                    opacity: 0.7
                }).addTo(map);

                // Ajustar el mapa para que se vean ambos puntos
                var bounds = L.latLngBounds([ubicacionNegocio, ubicacionUsuario]);
                map.fitBounds(bounds, { padding: [50, 50] });
            },
            function () {
                document.getElementById("mensaje-mapa").textContent = "No se pudo obtener tu ubicación.";
            }
        );
    } else {
        document.getElementById("mensaje-mapa").textContent = "Tu navegador no soporta geolocalización.";
    }
}
