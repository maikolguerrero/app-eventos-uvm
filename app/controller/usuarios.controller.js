// Llamamos a la funcion empresa
const { connection, Empresa } = require('../empresa/query_empresa')

// Definimos la constante bcrypt para encriptar el campo password
const bcrypt = require('bcrypt');

// Mostrar todos los usuarios
async function getListarUsuarios(req, res) {

    let sql_usuarios = `select * from usuarios`
    const result = await Empresa(sql_usuarios)

    //Enviamos la respuesta del servidor
    res.status(200).json({ status: 200, data: result })
}

// Función para mostrar 1 solo tipo
async function getUsuarioID(req, res) {
    
    const { id } = req.params
    let sql_usuarios = `select * from usuarios where id = ${parseInt(id)}`
    const result = await Empresa(sql_usuarios)

    //Enviamos la respuesta del servidor

    if (result.length === 0) {
        res.status(404).json({ status: 404, menssage: "No existe el Usuario que buscas"})
    } else {
        res.status(200).json({ status: 200, data: result })
    }
}

// Función para buscar un usuario por su username
async function getUsuarioUsername(req, res) {
    const { username } = req.params;
    const sql = 'SELECT * FROM usuarios WHERE username = ?';
    try {
        const result = await Empresa(sql, [username]);
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
async function getUsuarioEmail(req, res) {
    const { email } = req.params;
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    try {
      const result = await Empresa(sql, [email]);
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
async function getUsuariosRol(req, res) {
    const { rol } = req.params;
  
    try {
      const sql = "SELECT * FROM usuarios WHERE rol = ?";
      const results = await Empresa(sql, [rol]);
  
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
  
// Función para crear un nuevo usuario
async function newUsuario(req, res) {
    const { body } = req

    // Validación de campos obligatorios
    if (!body.nombre || !body.apellido || !body.genero || !body.cedula || !body.telefono || !body.email || !body.username || !body.password || !body.recibir_notificaciones || !body.url_avatar || !body.rol) {
        return res.status(400).json({ status: 400, message: "Faltan campos obligatorios por completar" })
    }

    // Comprobación de si ya existe el usuario por su email o username
    let sql_comprobacion = `SELECT * FROM usuarios WHERE email = '${body.email}' OR username = '${body.username}'`
    const result_comprobacion = await Empresa(sql_comprobacion)
    if (result_comprobacion.length > 0) {
        return res.status(200).json({ status: 200, message: "Ya existe un usuario con ese email o username, por lo tanto no se creó" })
    }

    // Hasheo de la contraseña
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Inserción del nuevo usuario en la base de datos
    let sql_usuarios = `INSERT INTO usuarios (nombre, apellido, genero, cedula, telefono, email, username, password, recibir_notificaciones, url_avatar, rol, fecha_creacion)
                        VALUES ('${body.nombre}', '${body.apellido}', '${body.genero}', '${body.cedula}', '${body.telefono}', '${body.email}', '${body.username}', '${hashedPassword}', '${body.recibir_notificaciones}', '${body.url_avatar}', '${body.rol}', NOW())`
    const result = await Empresa(sql_usuarios)

    // Envío de respuesta del servidor
    res.status(201).json({ status: 201, message: "Se creó con éxito el nuevo usuario" })
}


// Función para editar datos de un usuario
async function editUsuario(req, res) {
    const { body, params } = req

    // Creamos un objeto con los campos que se van a actualizar
    const campos = {}
    if (body.nombre) {
        campos.nombre = body.nombre
    }
    if (body.apellido) {
        campos.apellido = body.apellido
    }
    if (body.username) {
        campos.username = body.username
    }
    if (body.url_avatar) {
        campos.url_avatar = body.url_avatar
    }
    if (body.recibir_notificaciones) {
        campos.recibir_notificaciones = body.recibir_notificaciones
    }
    
    // Verificamos que se hayan enviado campos a actualizar
    if (Object.keys(campos).length === 0) {
        return res.status(400).json({ status: 400, menssage: "Debe enviar al menos un campo para actualizar"})
    }

    // Construimos la consulta SQL de manera dinámica
    let sql = `UPDATE usuarios SET `
    let values = []
    let i = 0
    for (const [key, value] of Object.entries(campos)) {
        sql += `${key} = ?`
        values.push(value)
        i++
        if (i < Object.keys(campos).length) {
            sql += `, `
        }
    }
    const id = params.id
    values.push(id)

    sql += ` WHERE id = ?`

    try {
        const result = await Empresa(sql, values)
        res.status(200).json({ status: 200, menssage: "Usuario actualizado exitosamente"})
    } catch (error) {
        console.log(`Hubo un error : ${error}`)
        res.status(500).json({ status: 500, menssage: "Error al actualizar el usuario"})
    }
}

// Función para eliminar un usuario
async function deleteUsuario(req, res) {
    const { params } = req
    const id = params.id

    try {
        // Verificamos si el usuario existe antes de eliminarlo
        const usuario = await Empresa(`SELECT * FROM usuarios WHERE id = ?`, [id])
        if (!usuario || usuario.length === 0) {
            return res.status(404).json({ status: 404, message: "El usuario no existe"})
        }

        // Si el usuario existe, lo eliminamos
        const result = await Empresa(`DELETE FROM usuarios WHERE id = ?`, [id])
        res.status(200).json({ status: 200, message: "Usuario eliminado exitosamente"})
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
        res.status(500).json({ status: 500, message: "Error al eliminar el usuario"})
    }
}

// Exportación de las funciones
module.exports = {
    getListarUsuarios,
    getUsuarioID,
    getUsuarioUsername,
    getUsuarioEmail,
    getUsuariosRol,
    newUsuario,
    editUsuario,
    deleteUsuario
}