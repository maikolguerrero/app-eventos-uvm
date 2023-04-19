// Definimos la constante bcrypt para encriptar el campo password
const bcrypt = require('bcrypt');

// Llamamos a tokenM que tiene las funciones para manejar tokens
const { tokenM } = require('../auth/auth')

// Definimos la constante usuariosModel para poder obtener los datos de la BD
const usuariosModel = require('../models/usuarios.model');

class usuariosController {
    // Mostrar todos los usuarios
    async getListarUsuarios(req, res) {
        try {
            const result = await usuariosModel.listar();
            res.status(200).json({ status: 200, data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: 'Ocurrió un error al obtener la lista de usuarios.' });
        }
    }

    // Función para mostrar 1 solo tipo
    async getUsuarioID(req, res) {
        try {
            const { id } = req.params;
            const result = await usuariosModel.obtenerPorUsername(id);
            if (result.length === 0) {
                res.status(404).json({ status: 404, menssage: "No existe el Usuario que buscas" });
            } else {
                res.status(200).json({ status: 200, data: result });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: "Ocurrió un error al obtener el usuario." });
        }
    }

    // Función para buscar un usuario por su username
    async getUsuarioUsername(req, res) {
        const { username } = req.params;
        try {
            const result = await usuariosModel.obtenerPorUsername(username);
            if (result.length === 0) {
                res.status(404).json({ status: 404, message: "No existe el usuario que buscas" });
            } else {
                res.status(200).json({ status: 200, data: result });
            }
        } catch (error) {
            console.log(`Hubo un error: ${error}`);
            res.status(500).json({ status: 500, message: "Error al buscar el usuario" });
        }
    }

    // Función para buscar un usuario por su email
    async getUsuarioEmail(req, res) {
        const { email } = req.params;
        try {
            const result = await usuariosModel.obtenerPorEmail(email);
            if (result.length === 0) {
                res.status(404).json({ status: 404, message: "No existe el usuario que buscas" });
            } else {
                res.status(200).json({ status: 200, data: result });
            }
        } catch (error) {
            console.log(`Hubo un error: ${error}`);
            res.status(500).json({ status: 500, message: "Error al buscar el usuario" });
        }
    }

    // Función para buscar usuarios según su rol
    async getUsuariosRol(req, res) {
        try {
            const { rol } = req.params;
            const results = await usuariosModel.listarPorRol(rol);
            if (results.length === 0) {
                res.status(404).json({ status: 404, message: "No hay usuarios con ese rol" });
            } else {
                res.status(200).json({ status: 200, data: results });
            }
        } catch (error) {
            console.log(`Hubo un error: ${error}`);
            res.status(500).json({ status: 500, message: "Error al buscar los usuarios" });
        }
    }

    async newUsuario(req, res) {
        const { body } = req

        // Validación de campos obligatorios
        if (!body.nombre || !body.apellido || !body.genero || !body.cedula || !body.telefono || !body.email || !body.username || !body.password || !body.recibir_notificaciones || !body.url_avatar || !body.rol) {
            return res.status(400).json({ status: 400, message: "Faltan campos obligatorios por completar" })
        }

        // Verificar que no exista el mismo email
        const existeEmail = await usuariosModel.obtenerPorEmail(body.email);
        if (existeEmail.length > 0) {
            return res.status(200).json({ status: 200, message: "Ya existe un usuario con ese email, por lo tanto no se creó." })
        }

        // Verificar que no exista el mismo username
        const existeUsername = await usuariosModel.obtenerPorUsername(body.username);
        if (existeUsername.length > 0) {
            return res.status(200).json({ status: 200, message: "Ya existe un usuario con ese username, por lo tanto no se creó." })
        }

        // Hasheo de la contraseña
        const hashedPassword = await bcrypt.hash(body.password, 10);

        try {
            await usuariosModel.crear(body.nombre, body.apellido, body.genero, body.cedula, body.telefono, body.email, body.username, hashedPassword, body.recibir_notificaciones, body.url_avatar, body.rol);
            res.status(201).json({ status: 201, message: "Se creó con éxito el nuevo usuario" });
        } catch (error) {
            console.log(`Hubo un error : ${error}`);
            res.status(500).json({ status: 500, message: "Error al crear el usuario" });
        }
    }

    // Función para editar datos de un usuario
    async editUsuario(req, res) {
        const { body, params } = req;

        const campos = {};
        if (body.nombre) {
            campos.nombre = body.nombre;
        }
        if (body.apellido) {
            campos.apellido = body.apellido;
        }
        if (body.genero) {
            campos.genero = body.genero;
        }
        if (body.cedula) {
            campos.cedula = body.cedula;
        }
        if (body.telefono) {
            campos.telefono = body.telefono;
        }
        if (body.url_avatar) {
            campos.url_avatar = body.url_avatar;
        }
        if (body.recibir_notificaciones) {
            campos.recibir_notificaciones = body.recibir_notificaciones;
        }

        if (Object.keys(campos).length === 0) {
            return res.status(400).json({ status: 400, message: "Debe enviar al menos un campo para actualizar" });
        }

        try {
            await usuariosModel.editar(campos, params.id);
            res.status(200).json({ status: 200, message: "Usuario actualizado exitosamente" });
        } catch (error) {
            console.log(`Hubo un error : ${error}`);
            res.status(500).json({ status: 500, message: "Error al actualizar el usuario" });
        }
    }

    async editUsuarioUsername(req, res) {
        const { body, params } = req;
        const id = params.id;
        const username = body.username;

        const existeUsername = await usuariosModel.obtenerPorUsername(username);
        if (existeUsername.length > 0) {
            return res.status(200).json({ status: 200, message: "Ya existe un usuario con ese username." })
        }

        try {
            await usuariosModel.editarUsername(id, username);
            res.status(200).json({ status: 200, message: "Usuario actualizado exitosamente" });
        } catch (error) {
            console.log(`Hubo un error : ${error}`);
            res.status(500).json({ status: 500, message: "Error al actualizar el usuario" });
        }
    }

    async editUsuarioPassword(req, res) {
        const { body, params } = req;
        const id = params.id;
        const password = body.password;

        // Hasheo de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await usuariosModel.editarPassword(id, hashedPassword);
            res.status(200).json({ status: 200, message: "Contraseña actualizado exitosamente" });
        } catch (error) {
            console.log(`Hubo un error : ${error}`);
            res.status(500).json({ status: 500, message: "Error al actualizar la contraseña" });
        }
    }

    // Función para eliminar un usuario
    async deleteUsuario(req, res) {
        const { id } = req.params;

        try {
            // Verificamos si el usuario existe antes de eliminarlo
            const usuario = await usuariosModel.obtenerPorId(id);
            if (usuario.length == 0) {
                return res.status(404).json({ status: 404, message: "El usuario no existe" });
            }

            // Si el usuario existe, lo eliminamos
            await usuariosModel.eliminar(id);

            res.status(200).json({ status: 200, message: "Usuario eliminado exitosamente" });
        } catch (error) {
            console.log(`Hubo un error: ${error}`);
            res.status(500).json({ status: 500, message: "Error al eliminar el usuario" });
        }
    }

    async iniciarSesion(req, res) {
        const { body } = req;
        const password = body.password;
        const username_o_email = body.username_o_email;

        var result;
        if (!emailValido(username_o_email)) {
            result = await usuariosModel.obtenerPorUsername(username_o_email);
        } else if (username_o_email) {
            result = await usuariosModel.obtenerPorEmail(username_o_email);
        }

        if (result.length > 0) {
            const usuario = result[0];
            const passwordBD = usuario.password;
            try {
                const validar = await bcrypt.compare(password, passwordBD);
                if (validar) {
                    // Generar el token
                    const token = tokenM.generarToken(usuario);
                    tokenM.agregarTokenValido(token)

                    // Devolver el token
                    return res.status(200).json({token: token});
                } else {
                    res.status(200).json({ status: 200, message: "Contraseña incorrecta" });
                }
            } catch (error) {
                console.log(`Hubo un error : ${error}`);
                res.status(500).json({ status: 500, message: "Error al verificar la contraseña" });
            }
        } else {
            res.status(404).json({ status: 404, message: "El usuario no existe" });
        }
    }

    async cerrarSesion(req, res) {
        try {
            const token = req.body.token;
            await tokenM.eliminarTokenValido(token);

            res.status(200).json({ status: 200, message: "Sesión cerrada exitosamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: "Ocurrió un error al cerrar sesión" });
        }
    }
}

function emailValido(email) {
    // Expresión regular para verificar si el string cumple con el patrón de un email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Exportación de las funciones
const usuariosC = new usuariosController();
module.exports = usuariosC;