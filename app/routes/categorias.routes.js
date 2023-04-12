const route = require('express').Router()

//traemos las funciones
const { getListarCategorias, getCategoria, newCategoria, editCategoria, deleteCategoria } = require('../controller/categorias.controller')

//Ruta para listar todas las categorias
route.get('/getListarCategorias', getListarCategorias)

//Ruta para mostrar una categorias
route.get('/getCategoria/:id', getCategoria)

//Ruta para agregar una categoria
route.post('/newCategoria', newCategoria)

//Ruta para editar una categoria
route.put('/editCategoria', editCategoria)

//Ruta para eliminar una categoria
route.delete('/deleteCategoria', deleteCategoria)

//Exportamos de las rutas
module.exports = route