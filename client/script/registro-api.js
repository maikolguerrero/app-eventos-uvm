// const miForm = document.querySelector('.form');
// const botonEnviar = document.querySelector('.form__input--button');

// botonEnviar.addEventListener('click', (event) => {
//     event.preventDefault();

//     const nombre = document.getElementById('name').value;
//     const apellido = document.getElementById('last-name').value;
//     const genero = document.getElementById('date').value;
//     const cedula = document.getElementById('cedula').value;
//     const telefono = document.getElementById('telefono').value;
//     const email = document.getElementById('email').value;
//     const username = document.getElementById('user').value;
//     const password = document.getElementById('password').value;
//     const notificaciones = document.getElementById('notifications').checked;
//     const url_iamgen = "url_imagen_avatar";
//     const rol = document.getElementById('rol').value;

//     let recibir_notificaciones;
//     if(notificaciones){
//         recibir_notificaciones = "1";
//     } else {
//         recibir_notificaciones = "0";
//     }

//     const formData = {
//         nombre,
//         apellido,
//         genero,
//         cedula,
//         telefono,
//         email,
//         username,
//         password,
//         recibir_notificaciones: recibir_notificaciones,
//         url_avatar: url_iamgen,
//         rol
//     };

//     console.log(formData);
//     fetch('http://localhost:8080/usuarios/registro', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//     })
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.error(error));
// });