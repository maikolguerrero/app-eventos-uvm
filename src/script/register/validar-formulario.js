const form = document.querySelector('.form');
const submitButton = form.querySelector('.form__input--button');

submitButton.addEventListener('click', (event) => {
  event.preventDefault();

  const repeatPassword = document.getElementById('repeat-password').value;
  const acceptCheckbox = document.getElementById("accept");

  const nombre = document.getElementById('name').value;
  const apellido = document.getElementById('last-name').value;
  const genero = document.getElementById('date').value;
  const cedula = document.getElementById('cedula').value;
  const telefono = document.getElementById('telefono').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('user').value;
  const password = document.getElementById('password').value;
  const notificaciones = document.getElementById('notifications').checked;
  const url_iamgen = "url_imagen_avatar";
  const rol = document.getElementById('rol').value;

  // Verificar que todos los campos estén completos y válidos
  if (nombre === '') {
    alert('Por favor, ingrese un nombre');
    return;
  }

  if (!validateName(nombre)) {
    alert('Por favor, ingrese un nombre valido (Solo letras)');
    return;
  }

  if (apellido === '') {
    alert('Por favor, ingrese un apellido');
    return;
  }

  if (!validateLastName(apellido)) {
    alert('Por favor, ingrese un apellido valido (Solo letras)');
    return;
  }

  if (!validateCedula(cedula)) {
    alert('Por favor, ingrese una cédulda de identidad válida (de 8 dígitos)');
    return;
  }

  if (!validateTelefono(telefono)) {
    alert('Por favor, ingrese una télefono válido (más de 7 dígito)');
    return;
  }

  if (email === '') {
    alert('Por favor, ingrese un correo electrónico');
    return;
  }

  if (!validateEmail(email)) {
    alert('Por favor, ingrese un correo electrónico válido');
    return;
  }

  if (username === '') {
    alert('Por favor, ingrese un username');
    return;
  }

  if (!validateUser(username)) {
    alert('Por favor, ingrese un username válido (Solo letras y numeros, de 4 a 16 caracteres)');
    return;
  }

  if (password === '') {
    alert('Por favor, ingrese una contraseña');
    return;
  }

  if (!validatePassword(password)) {
    alert('Por favor, ingrese una contraseña valida (mímino 8 dígitos con letras mayúsculas, minúsculas y carácteres especiales)');
    return;
  }

  if (repeatPassword === '') {
    alert('Por favor, repita la contraseña');
    return;
  }

  if (password !== repeatPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  if (!acceptCheckbox.checked) {
    alert("Por favor, acepte los terminos y condiciones");
    return;
  }

  let recibir_notificaciones;
  if (notificaciones) {
    recibir_notificaciones = "1";
  } else {
    recibir_notificaciones = "0";
  }

  const formData = {
    nombre,
    apellido,
    genero,
    cedula,
    telefono,
    email,
    username,
    password,
    recibir_notificaciones: recibir_notificaciones,
    url_avatar: url_iamgen,
    rol
  };

  //Conexión con la API
  fetch('http://localhost:8080/usuarios/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.status == 200) {
        alert(data.message);
      } else if (data.status == 201) {
        localStorage.setItem('token', data.token);
        alert(data.message);
        // Redirigir a la página de inicio de sesión
        window.location.href = './login.html'
      }
    })
    .catch(error => console.error(error));
});

function validateEmail(email) {
  // Validar que el correo electrónico tenga el formato correcto
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}

function validateUser(user) {
  // Validar que el usuario tenga el formato correcto
  const userRegex = /^[a-zA-Z0-9\_\-]{4,16}$/;
  return userRegex.test(user);
}

function validateName(name) {
  // Verificar que el nombre no esté vacío después de eliminar los espacios en blanco
  if (name.trim() === '') {
    return false;
  }

  // Validar que el nombre tenga el formato correcto
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

  return nameRegex.test(name);
}

function validateLastName(lastName) {

  // Verificar que el nombre no esté vacío después de eliminar los espacios en blanco
  if (lastName.trim() === '') {
    return false;
  }

  // Validar que el apellido tenga el formato correcto
  const lastNameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
  return lastNameRegex.test(lastName);
}

function validatePassword(password) {
  // Validar que la contraseña tenga el formato correcto
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  // Validar que no haya espacios en blanco
  const noSpacesRegex = /^\S*$/;

  return passwordRegex.test(password) && noSpacesRegex.test(password);
}

function validateCedula(cedula) {
  // Verificar que todos los caracteres sean dígitos
  if (!/^\d+$/.test(cedula)) {
    return false;
  }

  // Verificar que tenga 8 dígitos
  return (cedula.length == 8);
}

function validateTelefono(telefono) {
  // Verificar que todos los caracteres sean dígitos
  if (!/^\d+$/.test(telefono)) {
    return false;
  }

  // Verificar que tenga una longitud de 11 caracteres
  if (telefono.length < 7) {
    return false;
  }

  // Validación exitosa
  return true;
}