$(document).ready(function () {
    $.ajax({
        url: "js/noticias.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
            const contenedor = $("#contenedor-noticias");
            contenedor.empty(); // Limpiar antes de cargar noticias nuevas
            data.noticias.forEach(noticia => {
                const noticiaHTML = `
                    <div class="noticia">
                        <img src="${noticia.imagen}" alt="${noticia.titulo}" class="noticia-img">
                        <h3>${noticia.titulo}</h3>
                        <p>${noticia.contenido}</p>
                    </div>
                `;
                contenedor.append(noticiaHTML);
            });
        },
        error: function () {
            $("#contenedor-noticias").html("<p>Error al cargar las noticias.</p>");
        }
    });
});