const btnSeeMore = document.querySelector('.events__see-more') //obtenemos elementos
const moreInfo = document.querySelector('.events__more-info')
const btnSeeLess = document.querySelector('.events__see-less')
const eventsContainer = document.querySelector('.events__list')

//Damos un listener al contenedor padre para delegar los eventos

eventsContainer.addEventListener('click', (evento) =>{
    if(evento.target && evento.target.matches('.events__see-more')){//condicional para saber si si le está dando click al botón y si exsite un target
        let eC = evento.target.parentNode.parentNode //capturamos el contendor padre en este caso .events__event
        let eC2 = eC.querySelectorAll('.events__see-more, .events__more-info, .events__see-less') //seleccionamos los elementos quie necesitamos dentro de cada evento.
        eC2.forEach(element => {
              element.classList.add('active') // a cada elemento le ponemos la clase active
          });
        }else if(evento.target && evento.target.matches('.events__see-less')){ //lo mismo pero removiendo active
            let eC = evento.target.parentNode.parentNode
            let eC2 = eC.querySelectorAll('.events__see-more, .events__more-info, .events__see-less')
            eC2.forEach(element => {
              element.classList.remove('active')
          });
        }
        
})
