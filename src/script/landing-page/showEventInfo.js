const btnSeeMore = document.querySelector('.events__see-more') //obtenemos elementos
const moreInfo = document.querySelector('.events__more-info')
const btnSeeLess = document.querySelector('.events__see-less')
const eventContainer = document.querySelector('.events__event')
const eventsContainer = document.querySelector('.events__list')
const addClass = () =>{
        moreInfo.classList.add('active')
        btnSeeMore.classList.add('active')
        btnSeeLess.classList.add('active')
        eventContainer.classList.add('active')
}

eventsContainer.addEventListener('click', (e) =>{
    if(e.target && e.target.classList.contains('events__see-more')){
        addClass()
        console.log('este es')
    }
});

eventsContainer.addEventListener('click', (e) =>{
    if(e.target && document.querySelector('.events__see-less')){
        moreInfo.classList.remove('active')
        btnSeeMore.classList.remove('active')
        eventContainer.classList.remove('active')
        btnSeeLess.classList.remove('active')
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

