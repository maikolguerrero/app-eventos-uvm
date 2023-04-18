const route = require('express').Router()

//traemos las funciones
const { getListarEtiquetas, getEtiqueta, newEtiqueta, editEtiqueta, deleteEtiqueta } = require('../controller/etiquetas.contorller')

//Ruta de listar la data completa Tipos 
route.get('/getEtiquetas', getListarEtiquetas)

//Ruta de listar 1 Tipo 
route.get('/getEtiqueta/:id', getEtiqueta)

//Ruta de agregar 1 tipo
route.post('/newEtiqueta', newEtiqueta)

//Ruta de editar 1 tipo
route.put('/editEtiqueta', editEtiqueta)

//Ruta de eliminar 1 tipo
route.delete('/deleteEtiqueta', deleteEtiqueta)

//Exportamos de las rutas
module.exports = route