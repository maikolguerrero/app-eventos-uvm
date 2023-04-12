// Importación de app
const app = require('./app/app')

//Terminamos de levantar el servidor
app.listen(app.get('port'), (err) => {
    if(err) {
        console.log(`Hubo un error : ${err}`)
    }else {
        console.log(`Servidor corriendo en el puerto ${app.get('port')}`)
    }
})