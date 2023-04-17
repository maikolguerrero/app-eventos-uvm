const route = require('express').Router()

//traemos las funciones
const { getListarRegistros, getRegistro, newRegistro, editRegistro, deleteRegistro } = require('../controller/registros.eventos.ticket.controller')

//Ruta de listar la data completa Tipos 
route.get('/getRegistros', getListarRegistros)

//Ruta de listar 1 Tipo 
route.get('/getRegistro/:id', getRegistro)

//Ruta de agregar 1 tipo
route.post('/newRegistro', newRegistro)

//Ruta de editar 1 tipo
route.put('/editRegistro', editRegistro)

//Ruta de eliminar 1 tipo
route.delete('/deleteRegistro', deleteRegistro)

//Exportamos de las rutas
module.exports = route