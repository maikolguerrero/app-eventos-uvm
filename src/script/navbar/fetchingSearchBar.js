const containerSearch = document.querySelector('.header')
const searchBarResult = document.querySelector('.header__search-result')

containerSearch.addEventListener('keypress', async (e)=>{
    if(e.target.matches('.header__search-input')){
        console.log(e.key)
        if(e.key === 'Enter'){
            try {
                searchBarResult.innerHTML = 
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
                let query = e.target.value
                const url = `http://localhost:8080/eventos/getEventos/titulo/${query}`
                const res = await fetch(url)
                const data = await res.json()
                const result = data
                console.log(res)
                if(res.status === 404){
                    console.log('no hemos encontrado tu petición')
                }
                if(!res.ok && res.status!= 200 && res.status != 404){
                    console.log('error inesperado')
                }
                if(data.length===0){
                    searchBarResult.innerHTML = 
                    `
                    <p class="header__search-result-txt"><b>No hay resultados para tu búsqueda</b></p>
                    `
                }else if(res.status === 200){
                    let titulos = ''
                    result.forEach(evento => {
                        titulos +=
                        `
                        <div class="header__search-element">
                        <i class="fa-solid fa-magnifying-glass header__search-result-icon"></i>
                        <p class="header__search-result-txt">Un resultado de la búsqueda</p>
                        </div>
                        `
                        document.querySelector('.header__search-result').innerHTML = titulos
                    });
                    
                window.addEventListener('click', (e) =>{
                    if(e.target && input.contains(e.target)){
                        document.querySelector('.header__search-result').innerHTML = ''
                    }
                })
                }
            }catch (error) {
                console.log(error)
            }
        }
    }
})