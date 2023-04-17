const btn = document.querySelector('.header__button')
const menu = document.querySelector('.menu')

btn.addEventListener('click', () => {
    menu.classList.toggle('active')
})
