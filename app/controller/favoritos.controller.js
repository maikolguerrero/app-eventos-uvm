// Llamamos a la funcion empresa
const { connection, Empresa } = require('../empresa/query_empresa')

// Funcion para listar todos los recordatorios
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
            res.status(204).json({ message: "No existe el Favorito que buscas" })
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
            res.status(204).json({ message: "No existen Favoritos para el usuario especificado" })
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

// Función para Eliminar un Favorito en proceso
// async function deleteFavorito(req, res) {
//     const { body } = req

//     if (!body.id_evento_favorito) {
//         return res.status(400).json({ status: 400, message: "Has ingresado una propiedad o propiedades que no coinciden con: id_evento_favorito" })
//     }

//     let sql_comprobacion = `select * from eventos_favoritos where id_evento_favorito = '${body.id_evento_favorito}'`
//     const result_comprobacion = await Empresa(sql_comprobacion)
//     if (result_comprobacion.length === 0) {
//         return res.status(200).json({ status: 200, message: "No existe el Favorito que deseas eliminar" })
//     }

//     let sql_eventos_favoritos = `DELETE FROM eventos_favoritos WHERE eventos_favoritos.id_evento_favorito = ${body.id_evento_favorito}`
//     const result = await Empresa(sql_eventos_favoritos)

//     // Enviamos la respuesta del servidor
//     res.status(200).json({ status: 200, message: "Se eliminó con éxito el Favorito" })
// }



// Exportación de las funciones
module.exports = {
    getFavoritos,
    getOneFavorito,
    newFavorito,
}
