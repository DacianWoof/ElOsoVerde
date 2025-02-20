$(document).ready(function () {
    cargarGaleria();
});

function cargarGaleria() {
    $.ajax({
        url: "../js/galeria.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
            const contenedor = $("#contenedor-galeria");
            contenedor.empty();
            data.cartas.forEach(carta => {
                const cartaHTML = `
                    <div class="carta">
                        <img src="${carta.imagen}" alt="${carta.nombre}" class="carta-img">
                        <p>${carta.nombre}</p>
                    </div>
                `;
                contenedor.append(cartaHTML);
            });
        },
        error: function () {
            $("#contenedor-galeria").html("<p>Error al cargar la galería.</p>");
        }
    });
}