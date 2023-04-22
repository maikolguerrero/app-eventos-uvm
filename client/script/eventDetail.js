const urlEventos = `http://localhost:8080/eventos/getOneEvento/` 

document.addEventListener('DOMContentLoaded', async ()=> {
    const urlParams = new URLSearchParams(window.location.search);
    const idEvento = urlParams.get('id');
    
     const res = await fetch(urlEventos+idEvento)
     const evento = await res.json()
     let eventInfoContent = ''
     let date = evento[0].fecha // tomamos la fecha del evento y la separmos de la hora
     date = date.split('T')//solo fecha
     hora = date[1].split(':', 2)//solo hora
     //console.log(evento[0].titulo)
     const   linkImg = await loadImages(evento[0]) // funcion que hace fetch al url de la imagen y retorna su ubicación
    const endUrl = urlCutter(linkImg)//función que corta la ruta y la maneja para acceder a la caperta tomanod como referenc   el archivo HTML.
    const edad = await edadVerifier(evento[0])//función que nos dice "sin limite de edad" cuanod el valor del key es 0
    const string = await collaborators(evento[0])//función que parsea el nombre de los colaboradores para mostrarlos (Tal, ta tal)
    const endDate = await dateDMY(evento[0])//Arregla el formato de las fechas
    eventInfoContent += 
    `
    <div class="event-info__head-container">
            <img src="${endUrl}" alt="" class="event-info__event-backdrop">
            <h1 class="event-info__title">${evento[0].titulo}</h1>
        </div>
        <div class="event-info__info">
            <div class="event-info__details">
                <ul class="event-info__elements">
                    <li class="event-info__element"><i class="fa-solid fa-user event-info__icon"></i>${evento[0].organizador}</li>
                    <li class="event-info__element"><i class="fa-solid fa-users event-info__icon" event-info__icon></i>${string}</li>
                    <li class="event-info__element"><i class="fa-solid fa-location-dot event-info__icon"></i>${evento[0].lugar}</li>
                    <li class="event-info__element"><i class="fa-solid fa-ticket event-info__icon"></i>${evento[0].tickets}</li>
                    <li class="event-info__element"><i class="fa-solid fa-calendar event-info__icon"></i>${endDate}</li>
                    <li class="event-info__element"><i class="fa-solid fa-clock event-info__icon"></i>${hora[0]}:${hora[1]}</li>
                    <li class="event-info__element"><i class="fa-solid fa-star event-info__icon"></i>${evento[0].valoracion}</li>
                    <li class="event-info__element"><i class="fa-solid fa-circle-check event-info__icon"></i>${edad}</li>
                </ul>
            </div>
            <div class="event-info__description-container">
                <h2 class="event-info__description">Descripción</h2>
                <p class="event-info__p">${evento[0].descripcion}</p>
            </div>
        </div>
    `
    document.querySelector('.event-info').innerHTML = eventInfoContent
});

