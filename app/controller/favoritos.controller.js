// Llamamos a la funcion empresa
const { connection, Empresa } = require('../empresa/query_empresa')

// Funcion para listar todos los favoritos
async function getFavoritos(req, res) {
    try {
        console.log("getFavoritos");
        let sql_eventos_favoritos = `select * from eventos_favoritos`
        const result = await Empresa(sql_eventos_favoritos)

        //Enviamos la respuesta del servidor
        res.status(200).json({ status: 200, data: result })
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Ocurrió un error en el servidor' });
    }
}

// Funcion para mostrar 1 solo favorito por su id
async function getOneFavorito(req, res) {
    try {
        console.log("getOneFavorito");
        const { id } = req.params
        let sql_eventos_favoritos = `select * from eventos_favoritos where id_evento_favorito = ${parseInt(id)}`
        const result = await Empresa(sql_eventos_favoritos)

        //Enviamos la respuesta del servidor
        if (result.length === 0) {
            res.status(404).json({ message: "No existe el Favorito que buscas" })
        } else {
            res.status(200).json({ status: 200, data: result })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Ocurrió un error en el servidor' });
    }
}

// Funcion para mostrar todos los favoritos de un usuario en especifico por id
async function getFavoritosByIdUser(req, res) {
    try {
        const { id } = req.params
        let sql_eventos_favoritos = `SELECT * FROM eventos_favoritos WHERE id_usuario = ${parseInt(id)} ORDER BY fecha_agregado DESC`
        const result = await Empresa(sql_eventos_favoritos)

        // Enviamos la respuesta del servidor
        if (result.length === 0) {
            res.status(404).json({ message: "No existen Favoritos para el usuario especificado" })
        } else {
            res.status(200).json({ status: 200, data: result })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Ocurrió un error en el servidor' });
    }
}

// Función para crear un nuevo Favorito
async function newFavorito(req, res) {
    try {
        console.log("newFavorito");

        if (!req.body.id_evento || !req.body.id_usuario) {
            return res.status(400).json({ status: 400, data: "Has ingresado datos que no corresponden con los siguientes: id_evento, id_usuario" })
        }

        // Validación de datos
        const id_evento = parseInt(req.body.id_evento);
        const id_usuario = parseInt(req.body.id_usuario);

        if (isNaN(id_evento) || isNaN(id_usuario)) {
            return res.status(400).json({ status: 400, data: "Los datos ingresados no son válidos" })
        }

        // Verificar si el ID del evento existe en la base de datos
        let sql_check_evento = `SELECT * FROM eventos WHERE id = ?`
        const result_check_evento = await Empresa(sql_check_evento, [id_evento])
        if (result_check_evento.length === 0) {
            return res.status(400).json({ status: 400, data: "El ID del evento ingresado no existe en la base de datos" })
        }

        // Verificar si el ID del usuario existe en la base de datos
        let sql_check_usuario = `SELECT * FROM usuarios WHERE id = ?`
        const result_check_usuario = await Empresa(sql_check_usuario, [id_usuario])
        if (result_check_usuario.length === 0) {
            return res.status(400).json({ status: 400, data: "El ID del usuario ingresado no existe en la base de datos" })
        }

        // Consulta preparada para evitar la inyección SQL
        let sql_eventos_favoritos = `INSERT INTO eventos_favoritos (id_evento, id_usuario) VALUES (?, ?)`
        const result = await Empresa(sql_eventos_favoritos, [id_evento, id_usuario])

        // Enviamos la respuesta del servidor
        res.status(201).json({ status: 201, message: "Se creó con éxito el Favorito", respuesta: result })
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Ocurrió un error en el servidor' });
    }
}

// Función para Editar un Favorito
async function editFavorito(req, res) {
    const { body, params } = req

    // Creamos un objeto con los campos que se van a actualizar
    const campos = {}
    if (body.id_usuario) {
        campos.id_usuario = body.id_usuario
    }
    if (body.id_evento) {
        campos.id_evento = body.id_evento
    }
    
    // Verificamos que se hayan enviado campos a actualizar
    if (Object.keys(campos).length === 0) {
        return res.status(400).json({ status: 400, message: "Debe enviar al menos un campo para actualizar"})
    }

    // Verificamos si el favorito existe antes de intentar editarlo
    const id = params.id
    const favorito = await Empresa(`SELECT * FROM eventos_favoritos WHERE id_evento_favorito = ?`, [id])
    if (!favorito || favorito.length === 0) {
        return res.status(404).json({ status: 404, message: "El favorito no existe"})
    }

    // Verificamos si el id_usuario y el id_evento existen en sus respectivas tablas
    if (campos.id_usuario) {
        const usuario = await Empresa(`SELECT * FROM usuarios WHERE id = ?`, [campos.id_usuario])
        if (!usuario || usuario.length === 0) {
            return res.status(404).json({ status: 404, message: "El usuario no existe"})
        }
    }
    if (campos.id_evento) {
        const evento = await Empresa(`SELECT * FROM eventos WHERE id = ?`, [campos.id_evento])
        if (!evento || evento.length === 0) {
            return res.status(404).json({ status: 404, message: "El evento no existe"})
        }
    }

    // Construimos la consulta SQL de manera dinámica
    let sql = `UPDATE eventos_favoritos SET `
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
    values.push(id)

    sql += ` WHERE id_evento_favorito = ?`

    try {
        const result = await Empresa(sql, values)
        res.status(200).json({ status: 200, message: "Favorito actualizado exitosamente"})
    } catch (error) {
        console.log(`Hubo un error : ${error}`)
        res.status(500).json({ status: 500, message: "Error al actualizar el favorito"})
    }
}


// Función para Eliminar un Favorito
async function deleteFavorito(req, res) {
    const { params } = req
    const id = params.id

    try {
        // Verificamos si el favorito existe antes de eliminarlo
        const favorito = await Empresa(`SELECT * FROM eventos_favoritos WHERE id_evento_favorito = ?`, [id])
        if (!favorito || favorito.length === 0) {
            return res.status(404).json({ status: 404, message: "El favorito no existe"})
        }

        // Si el favorito existe, lo eliminamos
        const result = await Empresa(`DELETE FROM eventos_favoritos WHERE id_evento_favorito = ?`, [id])
        res.status(200).json({ status: 200, message: "Favorito eliminado exitosamente"})
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
        res.status(500).json({ status: 500, message: "Error al eliminar el favorito"})
    }
}

// Exportación de las funciones
module.exports = {
    getFavoritos,
    getOneFavorito,
    newFavorito,
    deleteFavorito,
    getFavoritosByIdUser,
    editFavorito,
}
