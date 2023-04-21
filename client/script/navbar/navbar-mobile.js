const btn = document.querySelector('.header__button')
const menu = document.querySelector('.menu')

btn.addEventListener('click', () => {
    menu.classList.toggle('active')
})

///botón barra de búsqueda
const sBtn = document.querySelector('.header__search-button')//cojemos los elementos
const searchBar = document.querySelector('.header__search-input-container')
const bgBlur = document.querySelector('.header__search-blur')

sBtn.addEventListener('click', () =>{
    searchBar.classList.toggle('active')
    bgBlur.classList.toggle('active')
})