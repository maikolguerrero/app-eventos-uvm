const btnSeeMore = document.querySelector('.events__see-more') //obtenemos elementos
const moreInfo = document.querySelector('.events__more-info')
const btnSeeLess = document.querySelector('.events__see-less')
const eventsContainer = document.querySelector('.events__list')
eventsContainer.addEventListener('click', (evento) =>{
    if(evento.target && evento.target.matches('.events__see-more')){
        let eC = evento.target.parentNode.parentNode
        let eC2 = eC.querySelectorAll('.events__see-more, .events__more-info, .events__see-less')
        eC2.forEach(element => {
              element.classList.add('active')
          });
        }else if(evento.target && evento.target.matches('.events__see-less')){
            let eC = evento.target.parentNode.parentNode
            let eC2 = eC.querySelectorAll('.events__see-more, .events__more-info, .events__see-less')
            eC2.forEach(element => {
              element.classList.remove('active')
          });
        }
        
})
// btnSeeMore.addEventListener('click', ()=>{
//         moreInfo.classList.add('active')
//         btnSeeMore.classList.add('active')
//         btnSeeLess.classList.add('active')
//         eventContainer.classList.add('active')
// })

// btnSeeLess.addEventListener('click', () =>{
//     moreInfo.classList.remove('active')
//     btnSeeMore.classList.remove('active')
//     eventContainer.classList.remove('active')
//     btnSeeLess.classList.remove('active')
// })

