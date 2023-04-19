const form = document.querySelector('.form');
const submitButton = form.querySelector('.form__input--button');

submitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Evita que se envíe el formulario automáticamente
  
  const eventTitle = document.getElementById('event-title').value;
  const manager = document.getElementById('manager').value;
  const collaborators = document.getElementById('collaborators').value;
  const place = document.getElementById('place').value;
  const date = document.getElementById('date').value;
  const tickets = document.getElementById('tickets').value;
  const seats = document.getElementById('seats').value;
  const description = document.getElementById('description').value;
  const duration = document.getElementById('duration').value;
  
  // Verificar que todos los campos estén completos y válidos
  if (eventTitle === '') {
    alert('Por favor, ingrese un titulo para el evento');
    return;
  }

  if (!validateEventTitle(eventTitle)) {
    alert('Por favor, ingrese un titulo valido para el evento (Solo letras y numeros, de 4 a 20 dígitos)');
    return;
  }

  if (manager === '') {
    alert('Por favor, ingrese un organizador');
    return;
  }

  if (!validateManager(manager)) {
    alert('Por favor, ingrese un organizador valido (Solo letras y numeros, de 4 a 20 dígitos)');
    return;
  }

  if (collaborators === '') {
    alert('Por favor, ingrese los participantes');
    return;
  }

  if (!validateCollaborators(collaborators)) {
    alert('Por favor, ingrese valores validos para los participantes (Solo letras y numeros, de 4 a 20 dígitos)');
    return;
  }

  if (place === '') {
    alert('Por favor, ingrese un lugar');
    return;
  }

  if (!validatePlace(place)) {
    alert('Por favor, ingrese un lugar válido (Solo letras y numeros, de 4 a 20 dígitos)');
    return;
  }

  if (date === '') {
    alert('Por favor, ingrese una fecha para el evento');
    return;
  }

  if (tickets === '') {
    alert('Por favor, ingrese una cantidad de boletos disponibles para el evento');
    return;
  }

  if (seats === '') {
    alert('Por favor, ingrese un numero de asientos para el evento');
    return;
  }

  if (description === '') {
    alert('Por favor, ingrese una descripción del evento');
    return;
  }

  if (!validateDescription(description)) {
    alert('Por favor, ingrese una descripción válida (Solo letras y numeros, de 25 a 600 dígitos)');
    return;
  }

  if (duration === '') {
    alert('Por favor, ingrese una duración para el evento');
    return;
  }

  // Si todos los campos están completos y válidos, enviar el formulario
  form.submit();
});

function validateEventTitle(eventTitle) {
    
    const eventTitleRegex = /^[a-zA-ZÀ-ÿ0-9()/s\_\-\ \ ]{4,20}$/;
    return eventTitleRegex.test(eventTitle);
}

function validateManager(manager) {
    
    const managerRegex = /^[a-zA-ZÀ-ÿ0-9()/s\_\-\ \ ]{4,20}$/;
    return managerRegex.test(manager);
}

function validateCollaborators(collaborators) {
    
    const collaboratorsRegex = /^[a-zA-ZÀ-ÿ0-9()/s\_\-\ \ ]{4,20}$/;
    return collaboratorsRegex.test(collaborators);
}

function validatePlace(place) {
    
    const placeRegex = /^[a-zA-ZÀ-ÿ0-9()/s\_\-\ \ ]{4,25}$/;
    return placeRegex.test(place);
}

function validateDescription(description) {
    
    const descriptionRegex = /^[a-zA-ZÀ-ÿ0-9()/s\_\-\ \ ]{25,600}$/;
    return descriptionRegex.test(description);
}
