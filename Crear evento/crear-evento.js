const botonMenu = document.querySelector('#boton-menu');
const menu = document.querySelector('#menu');

botonMenu.addEventListener('click', () => {
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
});