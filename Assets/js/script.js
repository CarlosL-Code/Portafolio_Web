/* =========================
   Menú Responsive
========================= */
let menuVisible = false;

function mostrarOcultarMenu() {
    const nav = document.getElementById("nav");
    if (menuVisible) {
        nav.classList = "";
        menuVisible = false;
    } else {
        nav.classList = "responsive";
        menuVisible = true;
    }
}

// Cierra el menú al hacer scroll
window.addEventListener("scroll", () => {
    if (!menuVisible) return;
    const nav = document.getElementById("nav");
    if (!nav) return;
    nav.classList.remove("responsive");
    menuVisible = false;
}, { passive: true });

// Cierra el menú al hacer click fuera del nav y del botón
document.addEventListener("click", (e) => {
    if (!menuVisible) return;

    const nav = document.getElementById("nav");
    const toggleBtn = document.querySelector(".nav-responsive"); // <div class="nav-responsive">
    if (!nav || !toggleBtn) return;

    const clicDentroDelNav = nav.contains(e.target);
    const clicEnToggle = toggleBtn.contains(e.target);

    if (!clicDentroDelNav && !clicEnToggle) {
        nav.classList.remove("responsive");
        menuVisible = false;
    }
});

// Si usas los links del menú para navegar, ciérralo también
function seleccionar(e) {
    const nav = document.getElementById("nav");
    if (!nav) return;
    nav.classList.remove("responsive");
    menuVisible = false;
}

function seleccionar() {
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

/* =========================
   Animaciones de habilidades
========================= */
function efectoHabilidades() {
    const skills = document.getElementById("skills");
    if (!skills) return;

    const distanciaSkills = window.innerHeight - skills.getBoundingClientRect().top;
    if (distanciaSkills >= 300) {
        const habilidades = document.getElementsByClassName("progreso");
        if (habilidades.length > 0) {
            habilidades[0].classList.add("javascript");
            habilidades[1].classList.add("htmlcss");
            habilidades[2].classList.add("java");
            habilidades[3].classList.add("sql");
            habilidades[4].classList.add("python");
            habilidades[5].classList.add("c");
            habilidades[6].classList.add("comunicacion");
            habilidades[7].classList.add("trabajo");
            habilidades[8].classList.add("creatividad");
            habilidades[9].classList.add("dedicacion");
            habilidades[10].classList.add("diseno");
        }
    }
}

function animarNivelesObserver() {
    const niveles = document.querySelectorAll('.nivel.scroll-anim');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible'); // <- para que se reinicie
            }
        });
    }, { threshold: 0.7 }); // 30% visible

    niveles.forEach(nivel => observer.observe(nivel));
}

window.addEventListener('load', animarNivelesObserver);


/* =========================
   Acordeón de certificaciones
========================= */
document.querySelectorAll('.certificado-item').forEach(item => {
    const header = item.querySelector('.certificado-header');
    const content = item.querySelector('.certificado-contenido');

    item.addEventListener('mouseenter', () => {
        document.querySelectorAll('.certificado-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.querySelector('.certificado-header').classList.remove('activo');
                otherItem.querySelector('.certificado-contenido').classList.remove('mostrar');
            }
        });
        header.classList.add('activo');
        content.classList.add('mostrar');
    });

    item.addEventListener('mouseleave', () => {
        header.classList.remove('activo');
        content.classList.remove('mostrar');
    });
});

/* =========================
   Formulario con mensaje
========================= */
const formulario = document.getElementById("miFormulario");
const mensajeFormulario = document.getElementById("mensaje-formulario");

if (formulario && mensajeFormulario) {
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch(this.action, {
            method: this.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                mostrarMensaje("¡Formulario enviado correctamente!", "exito");
                this.reset();
            } else {
                mostrarMensaje("Hubo un error al enviar el formulario.", "error");
            }
        }).catch(error => {
            mostrarMensaje("Hubo un error al enviar el formulario.", "error");
            console.error(error);
        });
    });
}

function mostrarMensaje(texto, tipo) {
    mensajeFormulario.textContent = texto;
    mensajeFormulario.className = `mensaje ${tipo} mostrar`;

    // Ocultar automáticamente después de 4 segundos
    setTimeout(() => {
        mensajeFormulario.classList.remove("mostrar");
    }, 4000);
}

/* =========================
   Eventos de scroll y load
========================= */
window.addEventListener('scroll', efectoHabilidades);
window.addEventListener('scroll', animarNiveles);
if (typeof scrollPersonalImage === "function") {
    window.addEventListener('scroll', scrollPersonalImage);
}

window.addEventListener('load', efectoHabilidades);
window.addEventListener('load', animarNiveles);
if (typeof scrollPersonalImage === "function") {
    window.addEventListener('load', scrollPersonalImage);
}
