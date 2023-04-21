function verificarSesion() {
  const token = localStorage.getItem('token');
  if (token) {
    // Aquí va el código cuando el usuario haya iniciado sesión
  } else {
    window.location.href = 'login.html';
  }
}

const form = document.querySelector('.form');
const submitButton = document.querySelector('.form__input--button');

submitButton.addEventListener('click', (event) => {
  event.preventDefault();

  const username_o_email = document.getElementById('username_o_email').value;
  const password = document.getElementById('password').value;

  // Verificar que todos los campos estén completos y válidos
  if (username_o_email === '') {
    alert('Por favor, ingrese un nombre de usuario o correo electrónico válido');
    return;
  }

  if (!validateEmail(username_o_email)) {
    if (!validateUser(username_o_email)) {
      alert('Por favor, ingrese un nombre de usuario o correo electrónico válido');
      return;
    }
  }

  if (password === '') {
    alert('Por favor, ingrese una contraseña');
    return;
  }

  if (!validatePassword(password)) {
    alert('Por favor, ingrese una contraseña valida (de 8 dígitos mínimo)');
    return;
  }

  const formData = {
    username_o_email,
    password
  };

  console.log(formData);
  fetch('http://localhost:8080/usuarios/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.token){
        localStorage.setItem('token', data.token);
      } else {
        alert("Datos incorrectos, por favor vuelva a intentar");
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

function validatePassword(password) {
  // Validar que la contraseña tenga el formato correcto
  const passwordRegex = /^.{8,}$/;
  return passwordRegex.test(password);
}