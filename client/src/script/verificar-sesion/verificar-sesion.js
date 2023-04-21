// Se ocultan los elementos para cuando el usuario haya iniciado sesión
function mostrarSesionActiva() {
    const sesionCerrada = document.getElementsByClassName('sesion-cerrada');
    for (let i = 0; i < sesionCerrada.length; i++) {
        sesionCerrada[i].style.display = 'none';
    }
}

// Se ocultan los elementos para cuando el usuario NO haya iniciado sesión
function mostrarSesionCerrada() {
    const sesionActiva = document.getElementsByClassName('sesion-activa');
    for (let i = 0; i < sesionActiva.length; i++) {
        sesionActiva[i].style.display = 'none';
    }
}

// Verificar si la sesión está activa o no
function verificarSesion() {
    const token = localStorage.getItem('token');
    if (token) {
        mostrarSesionActiva();
    } else {
        mostrarSesionCerrada();
    }
}
verificarSesion();

// Se retira el token al cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('token');
}

// Escuchar el evento cuando se haga click en los botones para cerrar sesión
const cerrarSesionBtn = document.getElementById('cerrar-sesion-btn');
cerrarSesionBtn.addEventListener('click', function () {
    console.log("boton cerrar sesion");
    cerrarSesion();
    location.reload();
});

const cerrarSesionMenuDesplegableBtn = document.getElementById('cerrar-sesion-menu-desplegable-btn');
cerrarSesionMenuDesplegableBtn.addEventListener('click', function () {
    console.log("boton cerrar sesion");
    cerrarSesion();
    location.reload();
});




