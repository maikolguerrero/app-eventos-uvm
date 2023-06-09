//Definimos el objeto de enrutamiento
const route = require('express').Router()

//Trallendo las funciones 
const {getFavoritos, getOneFavorito, newFavorito, deleteFavorito, getFavoritosByIdUser, editFavorito} = require('../controller/favoritos.controller')

//Ruta para buscar todos los favoritos
route.get('/getFavoritos', getFavoritos)
//Ruta para buscar 1 favorito por su id
route.get('/getFavoritos/:id', getOneFavorito)
//Ruta para buscar todos los favorito de un usuario por su id
route.get('/getFavoritos/usuario/:id', getFavoritosByIdUser)
//Ruta para buscar agregar un nuevo favorito
route.post('/newFavorito', newFavorito)
//Ruta para editar un favorito por su id
route.put('/editarFavorito/:id', editFavorito)
//Ruta para eliminar un favorito por su id
route.delete('/deleteFavorito/:id', deleteFavorito)

//Exportación de las rutas
module.exports = route
