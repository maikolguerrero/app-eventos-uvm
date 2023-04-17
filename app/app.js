// Realizamos las importaciones
const express = require('express')
const port = process.env.PORT || 8080
const { urlencoded, json } = require('express')
const path = require('path')
const cors = require('cors')

// inicialización de la constante app
const app = express()

//Envio del puerto
app.set('port', port)

// middlewares (urlencoded para el manejo de imágenes), json para devolver los datos a cliente
app.use(cors())
app.use(urlencoded({extended: true}))
app.use(json())

// Configuración de las rutas 
app.use('/recordatorios', require('./routes/recordatorios.routes'))
app.use('/tipos', require('./routes/tipos.routes'))
app.use('/categorias', require('./routes/categorias.routes'))
app.use('/tickets', require('./routes/tickets.routes'))
app.use('/registro_usuario_evento', require('./routes/registro.eventos.ticket'))
app.use('/eventos', require('./routes/eventos.routes'))
app.use('/usuarios', require('./routes/usuarios.routes'))

// Middleware para manejar rutas no encontradas y devolver error 404
app.use((req, res, next) => {
    res.status(404).json({ status: 404, message: "La ruta que buscas no existe" });
  });

// Definición de los archivos estáticos (donde se van a subir las imágenes) 
app.use(express.static(path.join(__dirname, '../static')))

// Exportamos la constante app 
module.exports = app
