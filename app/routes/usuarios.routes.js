//Definimos el objeto de enrutamiento
const route = require('express').Router()

//Traemos las funciones
const { getListarUsuarios, getUsuarioID, getUsuarioUsername, getUsuarioEmail, getUsuariosRol, newUsuario, editUsuario, deleteUsuario } = require('../controller/usuarios.controller')

//Ruta de listar todos los usuarios
route.get('/', getListarUsuarios)
//Ruta de listar 1 Usuario por ID
route.get('/id/:id', getUsuarioID)
//Ruta de listar 1 Usuario por username
route.get('/username/:username', getUsuarioUsername)
//Ruta de listar 1 Usuario por email
route.get('/email/:email', getUsuarioEmail)
//Ruta de listar usuarios según su rol
route.get('/rol/:rol', getUsuariosRol)
//Ruta de agregar 1 Usuario
route.post('/new-usuario', newUsuario)
//Ruta de editar 1 Usuario
route.put('/edit-usuario/:id', editUsuario)
//Ruta de eliminar 1 Usuario
route.delete('/delete-usuario/:id', deleteUsuario)

//Exportamos las rutas
module.exports = route