const route = require('express').Router()

//traemos las funciones
const { getListarEvenEtiqueta, getEvenEtiqueta, newEvenEtiqueta, editEvenEtiqueta, deleteEvenEtiqueta, getEvenEtiquetaListar } = require('../controller/eventos.etiqueta.controller')

//Ruta de listar la data completa Tipos 
route.get('/getEventosEtiquetas', getListarEvenEtiqueta)

//Ruta de listar 1 Tipo 
route.get('/getEventosEtiqueta/:id', getEvenEtiqueta)

//Ruta de listar 1 Tipo 
route.get('/getEvento_Etiqueta_Listar_Etiquetas/:id', getEvenEtiquetaListar)

//Ruta de agregar 1 tipo
route.post('/newEventosEtiqueta', newEvenEtiqueta)

//Ruta de editar 1 tipo
route.put('/editEventosEtiqueta', editEvenEtiqueta)

//Ruta de eliminar 1 tipo
route.delete('/deleteEventosEtiqueta', deleteEvenEtiqueta)

//Exportamos de las rutas
module.exports = route