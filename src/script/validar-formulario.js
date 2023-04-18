const form = document.querySelector('.form');
const submitButton = form.querySelector('.form__input--button');

submitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Evita que se envíe el formulario automáticamente
  
  const user = document.getElementById('user').value;
  const name = document.getElementById('name').value;
  const lastName = document.getElementById('last-name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const repeatPassword = document.getElementById('repeat-password').value;
  const date = document.getElementById('date').value;
  const acceptCheckbox = document.getElementById("accept");
  
  // Verificar que todos los campos estén completos y válidos
  if (user === '') {
    alert('Por favor, ingrese un usuario');
    return;
  }

  if (!validateUser(user)) {
    alert('Por favor, ingrese un usuario valido (Solo letras y numeros, de 4 a 16 dígitos)');
    return;
  }

  if (name === '') {
    alert('Por favor, ingrese un nombre');
    return;
  }

  if (!validateName(name)) {
    alert('Por favor, ingrese un nombre valido (Solo letras)');
    return;
  }

  if (lastName === '') {
    alert('Por favor, ingrese un apellido');
    return;
  }

  if (!validateLastName(lastName)) {
    alert('Por favor, ingrese un apellido valido (Solo letras)');
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

  if (password === '') {
    alert('Por favor, ingrese una contraseña');
    return;
  }

  if (!validatePassword(password)) {
    alert('Por favor, ingrese una contraseña valida (de 6 a 12 dígitos)');
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

  if (date === '') {
    alert('Por favor, ingrese una fecha de nacimiento');
    return;
  }

  if (acceptCheckbox.checked) {
    
  } else {
    alert("Por favor, acepte los terminos y condiciones");
    return;
  }


  // Si todos los campos están completos y válidos, enviar el formulario
  form.submit();
});

function validateEmail(email) {
  // Validar que el correo electrónico tenga el formato correcto
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}

function validateUser(user) {
    // Validar que el correo electrónico tenga el formato correcto
    const userRegex = /^[a-zA-Z0-9\_\-]{4,16}$/;
    return userRegex.test(user);
  }

function validateName(name) {
    // Validar que el correo electrónico tenga el formato correcto
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    return nameRegex.test(name);
  }

function validateLastName(lastName) {
    // Validar que el correo electrónico tenga el formato correcto
    const lastNameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    return lastNameRegex.test(lastName);
  }

function validatePassword(password) {
    // Validar que el correo electrónico tenga el formato correcto
    const passwordRegex = /^.{6,12}$/;
    return passwordRegex.test(password);
  }