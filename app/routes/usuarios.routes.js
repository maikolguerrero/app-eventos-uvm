//Definimos el objeto de enrutamiento
const route = require('express').Router()

// Definimos la constante usuariosControler para poder realizar las acciones del CRUD
const usuariosControler = require('../controller/usuarios.controller')

//Ruta de listar todos los usuarios
route.get('/', usuariosControler.getListarUsuarios)
//Ruta de listar 1 Usuario por ID
route.get('/id/:id', usuariosControler.getUsuarioID)
//Ruta de listar 1 Usuario por username
route.get('/username/:username', usuariosControler.getUsuarioUsername)
//Ruta de listar 1 Usuario por email
route.get('/email/:email', usuariosControler.getUsuarioEmail)
//Ruta de listar usuarios según su rol
route.get('/rol/:rol', usuariosControler.getUsuariosRol)
//Ruta de agregar 1 Usuario
route.post('/registro', usuariosControler.newUsuario)
//Ruta de editar 1 Usuario
route.put('/edit-usuario/:id', usuariosControler.editUsuario)
//Ruta de editar el username de 1 Usuario
route.put('/edit-usuario/:id/username', usuariosControler.editUsuarioUsername)
//Ruta de editar la password de 1 Usuario
route.put('/edit-usuario/:id/password', usuariosControler.editUsuarioPassword)
//Ruta de eliminar 1 Usuario
route.delete('/delete-usuario/:id', usuariosControler.deleteUsuario)
//Ruta para iniciar sesión
route.post('/login', usuariosControler.iniciarSesion)
//Ruta para cerrar sesión
route.post('/logout', usuariosControler.cerrarSesion);

//Exportamos las rutas
module.exports = route