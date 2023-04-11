// Realizamos las importaciones
const express = require('express')
const port = process.env.PORT || 8080
const { urlencoded, json } = require('express')
const path = require('path')
const cors = require('cors')

// inicialización de la variable app
const app = express()

//Envio del puerto
app.set('port', port)

// middlewares (urlencoded para el manejo de imágenes), json para devolver los datos a cliente
app.use(cors())
app.use(urlencoded({extended: true}))
app.use(json())

// Configuración de las rutas 
app.use('/eventos', require('./routes/eventos.routes'))

// Definición de los archivos estáticos (donde se van a subir las imágenes) 
app.use(express.static(path.join(__dirname, '../static')))

// Exportamos la variable app
module.exports = app