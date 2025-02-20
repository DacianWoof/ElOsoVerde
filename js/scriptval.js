document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-presupuesto");
    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const email = document.getElementById("email");
    const producto = document.getElementById("producto");
    const plazo = document.getElementById("plazo");
    const extra1 = document.getElementById("extra1");
    const extra2 = document.getElementById("extra2");
    const totalSpan = document.getElementById("total");
    const mensajeError = document.getElementById("mensaje-error");

    // Función para calcular el presupuesto en tiempo real
    function calcularPresupuesto() {
        let precioBase = parseInt(producto.value);
        let meses = parseInt(plazo.value);
        let extraTotal = (extra1.checked ? parseInt(extra1.value) : 0) + 
                         (extra2.checked ? parseInt(extra2.value) : 0);

        if (isNaN(meses) || meses < 1 || meses > 24) {
            totalSpan.textContent = "$0";
            return;
        }

        let total = (precioBase * meses) + extraTotal;
        totalSpan.textContent = `$${total}`;
    }

    // Validación del formulario antes del envío
    function validarFormulario(event) {
        mensajeError.textContent = "";

        if (nombre.value.trim() === "") {
            mensajeError.textContent = "Por favor, introduce tu nombre.";
            event.preventDefault();
            return;
        }

        if (!/^\d{9}$/.test(telefono.value)) {
            mensajeError.textContent = "El teléfono debe tener 9 dígitos numéricos.";
            event.preventDefault();
            return;
        }

        if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email.value)) {
            mensajeError.textContent = "Introduce un correo electrónico válido.";
            event.preventDefault();
            return;
        }

        if (isNaN(plazo.value) || plazo.value < 1 || plazo.value > 24) {
            mensajeError.textContent = "El plazo debe estar entre 1 y 24 meses.";
            event.preventDefault();
            return;
        }
    }

    // Eventos para actualizar el presupuesto dinámicamente
    producto.addEventListener("change", calcularPresupuesto);
    plazo.addEventListener("input", calcularPresupuesto);
    extra1.addEventListener("change", calcularPresupuesto);
    extra2.addEventListener("change", calcularPresupuesto);

    // Evento para validar el formulario antes del envío
    form.addEventListener("submit", validarFormulario);
});
