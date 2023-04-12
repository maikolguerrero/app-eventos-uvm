const route = require('express').Router()

//traemos las funciones
const { getListarTipos, getTipo, newTipo, editTipo, deleteTipo } = require('../controller/tipos.controller')

//Ruta de listar la data completa Tipos 
route.get('/getTipos', getListarTipos)

//Ruta de listar 1 Tipo 
route.get('/getTipo/:id', getTipo)

//Ruta de agregar 1 tipo
route.post('/newTipo', newTipo)

//Ruta de editar 1 tipo
route.put('/editTipo', editTipo)

//Ruta de eliminar 1 tipo
route.delete('/deleteTipo', deleteTipo)

//Exportamos de las rutas
module.exports = route