const route = require('express').Router()

//traemos las funciones
const { getListarTickets, getTicket, newTicket, editTicket, deleteTicket } = require('../controller/tickets.controller')

//Ruta de listar la data completa Tipos 
route.get('/getTickets', getListarTickets)

//Ruta de listar 1 Tipo 
route.get('/getTicket/:id', getTicket)

//Ruta de agregar 1 tipo
route.post('/newTicket', newTicket)

//Ruta de editar 1 tipo
route.put('/editTicket', editTicket)

//Ruta de eliminar 1 tipo
route.delete('/deleteTicket', deleteTicket)

//Exportamos de las rutas
module.exports = route