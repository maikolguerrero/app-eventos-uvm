//Definimos el objeto de enrutamiento
const route = require('express').Router()

//Declaramos a multer y nos traemos a storage
const storage = require('../../config/multer')
const multer = require('multer')
const uploader = multer({storage})

//Trallendo las funciones 
const {getInicializarionData, getOneEvento, getEventos, newEvento, getEventoEdad, getEventoTitulo, getEventoLugar, getEventoOrganizador, getEventoValoracion, getEventoDuracion, getEventoFecha, deleteEvento, editarEvento} = require('../controller/evento.controller')

//Ruta de inicializacion 
route.get('/getInicializationData', getInicializarionData)
//Ruta para buscar un evento por su id
route.get('/getOneEvento/:id', getOneEvento)
//Ruta para buscar eventos por su limite de edad
route.get('/getEventos/limite-edad/:limite_edad', getEventoEdad)
//Ruta para buscar eventos por su titulo
route.get('/getEventos/titulo/:titulo', getEventoTitulo)
//Ruta para buscar eventos por su Lugar
route.get('/getEventos/lugar/:lugar', getEventoLugar)
//Ruta para buscar eventos por su Organizador
route.get('/getEventos/organizador/:organizador', getEventoOrganizador)
//Ruta para buscar eventos por su Valoracion
route.get('/getEventos/valoracion/:valoracion', getEventoValoracion)
//Ruta para buscar eventos por su Duración
route.get('/getEventos/duracion/:duracion', getEventoDuracion)
//Ruta para buscar eventos por su Fecha
route.get('/getEventos/fecha/:fecha', getEventoFecha)
//Ruta para buscar todos los eventos
route.get('/getEventos', getEventos)
//Ruta para crear un nuevo evento
route.post('/newEvento', uploader.single('file'), newEvento)
//Ruta para eliminar un evento
route.delete('/delete-evento/:id', deleteEvento)
//Ruta de editar un Evento
route.put('/edit-evento/:id', uploader.single('file'), editarEvento)

//Exportación de las rutas
module.exports = route