const containerSearch = document.querySelector('.header')//seleccionamos elementos
const searchBarResult = document.querySelector('.header__search-result')

containerSearch.addEventListener('keypress', async (e)=>{//listenr que escucha las teclas
    if(e.target.matches('.header__search-input')){//si el target es el input
        if(e.key === 'Enter'){//si la tecla que se presiona en el target es enter
            try {
                searchBarResult.innerHTML = //carga el loader
                `
                <div class="dot-spinner">
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                </div>
                `
                let query = e.target.value //valor del input
                const url = `http://localhost:8080/eventos/getEventos/titulo/${query}`//pasamos valor del input al endpoint
                const res = await fetch(url)//fetch
                const data = await res.json()//parseamos respuesta
                const result = data
                if(res.status === 404){//verficamos  errores
                    console.log('no hemos encontrado tu petición')
                }
                if(!res.ok && res.status!= 200 && res.status != 404){//si no es un errror conocido
                    console.log('error inesperado')
                }
                if(data.length===0){//si nos devuelve un array vacío en las coincidencias
                    searchBarResult.innerHTML = 
                    `
                    <p class="header__search-result-txt"><b>No hay resultados para tu búsqueda</b></p>
                    `
                }else if(res.status === 200){//si el estado es ok
                    let titulos = ''
                    result.forEach(evento => {//guarda por evetno el siguiente código
                        const id = evento.id
                        titulos +=
                        `
                        <div class="header__search-element">
                        <i class="fa-solid fa-magnifying-glass header__search-result-icon"></i>
                        <p class="header__search-result-txt">${evento.titulo}</p>
                        </div>
                        `
                        document.querySelector('.header__search-result').innerHTML = titulos//dentro del contenedor 
                        let eventTitleLink = document.querySelector('.header__search-result')
                        eventTitleLink.addEventListener('click', (e) =>{
                            if(e.target && e.target.matches('.header__search-result-txt')){
                                window.location.href = './event-info.html?id='+id
                            }
                        })
                    });
                    
                window.addEventListener('click', (e) =>{//listener a la ventana vp
                    if(e.target && input.contains(e.target)){
                        document.querySelector('.header__search-result').innerHTML = ''//si se le da click (te sales del buscador) quita los resultados
                    }

                })
                }
            }catch (error) {//catch
                console.log(error)
            }
        }
    }
})