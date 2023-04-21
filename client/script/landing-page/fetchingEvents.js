
const url = 'http://localhost:8080/eventos/getEventos' //Url para obtener todos los eventos.

const loadEvent = async () => { //función async se usa try y catch
    try {
        const res = await fetch(url) //hacemos fetch al endppoint
        if (res.status === 200) { //verificamos el estado de la respuesta del fetch (res)
            const data = await res.json()//parseamos respuesta
            let eventos = ''//variable donde se guardara la data
            let results = data.slice(0, 5) // cortamos la data para que suelo muestre 5 eventos
            results.forEach(async (evento) => {//recorremos cada evento dentro de data
                const linkImg = await loadImages(evento) // funcion que hace fetch al url de la imagen y retorna su ubicación
                const endUrl = urlCutter(linkImg)//función que corta la ruta y la maneja para acceder a la caperta tomanod como referencia el archivo HTML.
                const edad = await edadVerifier(evento)//función que nos dice "sin limite de edad" cuanod el valor del key es 0
                const string = await collaborators(evento)//función que parsea el nombre de los colaboradores para mostrarlos (Tal, tal, tal)
                let date = evento.fecha // tomamos la fecha del evento y la separmos de la hora
                date = date.split('T')//solo fecha
                hora = date[1].split(':', 2)//solo hora
                eventos += //metemos una estructura html con la data dentro de la vaiable vacía
                    `
                <div class="events__event">
                        <div class="events__info">
                            <img src="${endUrl}" alt="" class="events__img">
                            <ul class="events__elements">
                                <li class="events__element events__element--title">${evento.titulo}</li>
                                <li class="events__element">${evento.lugar}</li>
                                <li class="events__element">${date[0]}</li>
                                <li class="events__element"><i class="fa-solid fa-star events__starIcon"></i>${evento.valoracion}</li>
                            </ul>
                        </div>
                        <div class="events__more-info">
                            <ul class="events__more-info-elements">
                                <li class="events__more-info-element">Organizador: <span class="events__element-title">${evento.organizador}</span></li>
                                <li class="events__more-info-element">Participantes: <span class="events__element-title">${string}</span></li>
                                <li class="events__more-info-element">Asientos dispobibles: <span class="events__element-title">${evento.disponibilidad_asientos}</span></li>
                                <li class="events__more-info-element">Duración de: <span class="events__element-title">${evento.duracion}</span></li>
                                <li class="events__more-info-element">Limita de edad: <span class="events__element-title">${edad}</span></li>
                                <li class="events__more-info-element">Hora de inicio: <span class="events__element-title">${hora[0]}:${hora[1]}</span></li>
                                <li class="events__more-info-element events__more-info-element--description"><p class="events__more-info-element-p">${evento.descripcion}</p></li>
                            </ul>
                            <button class="events__see-less events__btn">Ver menos</button>
                        </div>
                        <div class="events__btns">
                            <button class="events__see-more events__btn">Ver más</button>
                        </div>
                    </div>
                `
                document.querySelector('.events__list').innerHTML = eventos //cojems el contenedor donde se mostrará y metemos allí la estructara y data.
            });
        } else if (res.status === 404) {
            console.log('evento no encontrado')
        } else {
            console.log('error no esperado')
        }
    } catch (error) {
        console.log(error)
    }
}///comprobaciones y catch

// Función para cargar las imagenes
const loadImages = async (evento) => {
    const eventImagen = evento.url_imagen;
    try {
        const resImg = await fetch(eventImagen);
        if (resImg.status === 200) {
            const dataIMG = await resImg.json(); //Datos dentro de la url de la imagen
            const linkImg = dataIMG.direccion_img//ruta de la imagen
            return linkImg //retornamos la ruta.
        } else if (resImg.status === 404) {
            console.log('Dirección de imagen invalida')
        } else {
            console.log('Error inesperado al buscar imagen')
        }
    } catch (error) {
        console.log(error);
    }
};

loadEvent()
// Adaptar la ruta tomando como referencia el html
const urlCutter = (linkImg) => {
    endURL = linkImg.substring(linkImg.indexOf('static'), linkImg.length);
    return "../../" + endURL;//devolvemos la ruta corta
}
//si el valor de la edad es 0 es para todas las edades
const edadVerifier = (evento) => {
    const edad = evento.limite_edad
    if (edad === 0) {
        return 'Sin limite de edad.'
    } else if (edad > 0) {
        return edad
    }
}
//para mostrar colaboradores en forma Tal, tal, tal
const collaborators = (evento) => {
    let collaborators = evento.participantes
    let collaboratorsArr = JSON.parse(collaborators)//paseamos
    let string = ''//uso una varibale vacía para guardar la data
    collaboratorsArr.forEach(element => {//recorremos cada elemento del array
        string += element + ', '//lo guardas con una coma y un espacio dentro de la data.
    });
    return string//retornamos
}