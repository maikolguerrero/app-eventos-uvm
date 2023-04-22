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

//mostrar resultados de la barra de búsqueda
const input = document.querySelector('.header__search-input')
const results = document.querySelector('.header__search-results')

window.addEventListener('click', (e) =>{
    if(e.target && input.contains(e.target)){
        results.classList.add('active')
    }else{
        results.classList.remove('active')
        input.value = ""
    }
})

//Mostrar menú user
const btnUser = document.querySelector('.header__user-img-btn')
const userMenu = document.querySelector('.header__user-menu')

btnUser.addEventListener('click',() =>{
    userMenu.classList.toggle('active')
})

const btnUserDesk = document.querySelector('.header__user-img-desk-btn')

btnUserDesk.addEventListener('click',() =>{
    userMenu.classList.toggle('active')
})