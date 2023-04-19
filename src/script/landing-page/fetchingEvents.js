const apiKey = '?api_key=528e918e2e286e44f4581cdd94f39408';//url del api
const url = 'https://api.themoviedb.org/3'
const language = '&language=es-VE'
const urlImg = 'https://image.tmdb.org/t/p/w500/'

const loadEvent = async ()=>{ //usamos función async para esperar respuesta
   try{//try y catch usar en async fun
    const res = await fetch(url+'/movie/popular'+apiKey+language)//hacemos fetch al url
    if(res.status === 200){//comprobamos que la respuesta (res) es ok y si es
        const data = await res.json();//la pasamos a formato jotason
        let movies = '' //variable modificable vacía donde se ira´guardando un archivo html con la información recuperada.
        data.results.forEach(movie => {//recorremos cada elemetno dentro del array qeu queramos. En este caso dentor de data (puede ser data.loquesea)
            movies += `<div class="events__event">
            <div class="events__info">
                <img src="${urlImg+movie.poster_path}" alt="" class="events__img">
                <ul class="events__elements">
                    <li class="events__element events__element--title">${movie.title}</li>
                    <li class="events__element">Lugar</li>
                    <li class="events__element">Fecha</li>
                    <li class="events__element"><i class="fa-solid fa-star events__starIcon"></i>   4.5 stars</li>
                </ul>
            </div>
            <div class="events__more-info">
                <ul class="events__more-info-elements">
                    <li class="events__more-info-element">Organizador</li>
                    <li class="events__more-info-element">Participantes</li>
                    <li class="events__more-info-element">Asientos disponibles }</li>
                    <li class="events__more-info-element">duración }</li>
                    <li class="events__more-info-element">limite de edad </li>
                    <li class="events__more-info-element events__more-info-element--description">Descripción <p class="events__more-info-element-p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nobis amet numquam porro itaque, pariatur obcaecati! Ex commodi in odio sunt similique. Cum aliquid eius dolore nemo recusandae. Eligendi, soluta?</p></li>
                </ul>
                <button class="events__see-less events__btn">Ver menos</button>
            </div>
            <div class="events__btns">
                <button class="events__see-more events__btn">Ver más</button>
            </div>
        </div>
        <div class="events__event">
            <div class="events__info">
                <img src="../assets/img/h-scaled.jpg" alt="" class="events__img">
                <ul class="events__elements">
                    <li class="events__element events__element--title">Titulo de evento</li>
                    <li class="events__element">Lugar</li>
                    <li class="events__element">Fecha</li>
                    <li class="events__element"><i class="fa-solid fa-star events__starIcon"></i>   4.5 stars</li>
                </ul>
            </div>
            <div class="events__more-info">
                <ul class="events__more-info-elements">
                    <li class="events__more-info-element">Organizador</li>
                    <li class="events__more-info-element">Participantes</li>
                    <li class="events__more-info-element">Asientos disponibles }</li>
                    <li class="events__more-info-element">duración }</li>
                    <li class="events__more-info-element">limite de edad </li>
                    <li class="events__more-info-element events__more-info-element--description">Descripción <p class="events__more-info-element-p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nobis amet numquam porro itaque, pariatur obcaecati! Ex commodi in odio sunt similique. Cum aliquid eius dolore nemo recusandae. Eligendi, soluta?</p></li>
                </ul>
                <button class="events__see-less events__btn">Ver menos</button>
            </div>
            <div class="events__btns">
                <button class="events__see-more events__btn">Ver más</button>
            </div>
        </div>` //cojemos el array vacío creado antes y le sumamos un código html que recoja la info. Dicho html se guardara por cada elemenot que recorra el foreach.
        });//usamos backtips para poder tomar las key del json dentro del backtip ponemos la estructura.
        document.querySelector('.events__list').innerHTML //estamos agarrando el contenedor donde queremos mostrar la info.
        = movies //le pones = al código que le queremos insertar, por ello usamos innerHtml para hacer referencia al dom
    }else if(res.status === 401){
        console.log('API KEY ERROR')
    }else if(res.status === 404){
        console.log('no encontrado.')
    }
   }catch(e){
    console.log(e)
   }
}
loadEvent()