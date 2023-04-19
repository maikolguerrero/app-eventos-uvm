const form = document.querySelector('.form');
const submitButton = document.querySelector('.form__input--button');

submitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Evita que se envíe el formulario automáticamente
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // Verificar que todos los campos estén completos y válidos
 

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

  // Si todos los campos están completos y válidos, enviar el formulario
  form.submit();
});

function validateEmail(email) {
  // Validar que el correo electrónico tenga el formato correcto
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
    const passwordRegex = /^.{6,12}$/;
    return passwordRegex.test(password);
  }