// Espera a que todo el contenido de la página se cargue primero.
document.addEventListener("DOMContentLoaded", function() {

    // Carga el encabezado desde header.html y lo pone en la página.
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
            // Después de cargar el encabezado, marca el enlace de la página actual como activo.
            activarEnlaceActual();
        });

    // Carga el pie de página desde footer.html y lo pone en la página.
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        });

    // Función para resaltar el enlace de navegación de la página que se está viendo.
    function activarEnlaceActual() {
        const misEnlacesDeNavegacion = document.querySelectorAll('.nav-link');
        const paginaActual = window.location.pathname.split('/').pop();

        misEnlacesDeNavegacion.forEach(enlace => {
            const enlaceDeLaPagina = enlace.getAttribute('href');
            // Comprueba si el enlace coincide con la página actual.
            if (enlaceDeLaPagina === paginaActual || (paginaActual === '' && enlaceDeLaPagina === 'index.html')) {
                enlace.classList.add('active');
            }
        });
    }

    // --- Animación para el carrusel de proyectos en la página de inicio ---
    const listaDeCarruseles = document.querySelectorAll(".carrusel-infinito"); 

    // Si no hay carruseles, no hace nada.
    if (listaDeCarruseles.length > 0) {
        iniciarAnimacionDeCarrusel();
    }

    function iniciarAnimacionDeCarrusel() {
        listaDeCarruseles.forEach((carrusel) => {
            carrusel.setAttribute("data-animated", true);

            const parteInternaDelCarrusel = carrusel.querySelector(".elementos-carrusel"); 
            const elementosDelCarrusel = Array.from(parteInternaDelCarrusel.children);

            // Duplica los elementos del carrusel para crear un efecto de bucle
            elementosDelCarrusel.forEach((elemento) => {
                const copiaDelElemento = elemento.cloneNode(true);
                copiaDelElemento.setAttribute("aria-hidden", true);
                parteInternaDelCarrusel.appendChild(copiaDelElemento);
            });
        });
    }

    // --- Validación para el formulario de contacto ---
    const todosMisFormularios = document.querySelectorAll('#formulario-contacto'); 

    // Si no hay formularios en la página, no hace nada.
    if (todosMisFormularios.length > 0) {
        Array.from(todosMisFormularios).forEach(formulario => {
            formulario.addEventListener('submit', evento => {
                // Si el formulario no está completo y válido
                if (!formulario.checkValidity()) {
                    // evita que se envíe
                    evento.preventDefault();
                    evento.stopPropagation();
                } else {
                    // Si está completo, evita el envío real
                    evento.preventDefault();
                    alert('¡Formulario enviado con éxito! (Simulación)');
                    formulario.reset();
                    // y quita las clases de validación.
                    formulario.classList.remove('was-validated');
                }

                // Añade las clases de Bootstrap para mostrar los mensajes de validación.
                formulario.classList.add('was-validated');
            }, false);
        });
    }

    // --- Lógica para el Modal del Portafolio ---
    const ventanaDeProyecto = document.getElementById('modal-proyecto'); 
    if (ventanaDeProyecto) {
        ventanaDeProyecto.addEventListener('show.bs.modal', function (evento) {
            // Botón que activó el modal
            const botonQueAbrioModal = evento.relatedTarget;
            
            // Extraer la información de la tarjeta del proyecto
            const tarjetaDelProyecto = botonQueAbrioModal.closest('.card');
            const tituloDelProyecto = tarjetaDelProyecto.querySelector('.card-title').textContent;
            const descripcionDelProyecto = tarjetaDelProyecto.querySelector('.card-text').textContent;
            const rutaDeLaImagen = tarjetaDelProyecto.querySelector('.card-img-top').src;

            // Actualizar el contenido del modal
            const tituloDentroDelModal = ventanaDeProyecto.querySelector('.modal-title');
            const imagenDentroDelModal = ventanaDeProyecto.querySelector('.modal-body img');
            const textoDentroDelModal = ventanaDeProyecto.querySelector('.modal-body p');

            tituloDentroDelModal.textContent = tituloDelProyecto;
            imagenDentroDelModal.src = rutaDeLaImagen;
            textoDentroDelModal.textContent = descripcionDelProyecto;
        });
    }

    // --- Animación para el Hero de la página de inicio ---
    const heroAnimado = document.getElementById('hero-animado');
    if (heroAnimado) {
        // Pequeño retraso para asegurar que el CSS se ha cargado y el elemento está listo.
        setTimeout(() => {
            heroAnimado.classList.remove('d-none');
            heroAnimado.classList.add('animate__animated', 'animate__zoomIn');
        }, 100); // Retraso de 100ms
    }
});