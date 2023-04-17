const route = require('express').Router()

//traemos las funciones
const { getListarData, getListarUnoData, newRecordatorio, editRecordatorio, deleteRecordatorio} = require('../controller/recordatorios.controller')

//Ruta de listar la data completa 
route.get('/getRecordatorios', getListarData)

//Ruta de listar un solo recordatorio 
route.get('/getRecordatorio/:id', getListarUnoData)

//Ruta de crear un nuevo recordatorio
route.post('/newRecordatorio', newRecordatorio)

//Ruta de editar un recordatorio
route.put('/editRecordatorio', editRecordatorio)

//Ruta para eliminar un recordatorio
route.delete('/deleteRecordatorio', deleteRecordatorio)

//Exportamos de las rutas
module.exports = route