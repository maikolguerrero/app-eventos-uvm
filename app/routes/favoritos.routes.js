//Definimos el objeto de enrutamiento
const route = require('express').Router()

//Trallendo las funciones 
const {getFavoritos, getOneFavorito, newFavorito} = require('../controller/favoritos.controller')

//Ruta para buscar todos los favoritos
route.get('/getFavoritos', getFavoritos)
//Ruta para buscar 1 favorito por su id
route.get('/getFavoritos/:id', getOneFavorito)
//Ruta para buscar agregar un nuevo favorito
route.post('/NewFavorito', newFavorito)

//Exportación de las rutas
module.exports = route