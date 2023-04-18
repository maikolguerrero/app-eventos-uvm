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

// Función para crear un nuevo Favorito
async function newFavorito(req, res) {
    try {
        console.log("newFavorito");

        if (!req.body.id_evento || !req.body.id_usuario || !req.body.fecha_agregado) {
            return res.status(400).json({ status: "FAILED", data: "Has ingresado datos que no corresponden con los siguientes: id_evento, id_usuario, fecha_agregado" })
        }

        // Validación de datos
        const id_evento = parseInt(req.body.id_evento);
        const id_usuario = parseInt(req.body.id_usuario);
        const fecha_agregado = new Date(req.body.fecha_agregado);

        if (isNaN(id_evento) || isNaN(id_usuario) || isNaN(fecha_agregado.getTime())) {
            return res.status(400).json({ status: "FAILED", data: "Los datos ingresados no son válidos" })
        }

        // Consulta preparada para evitar la inyección SQL
        let sql_eventos_favoritos = `INSERT INTO eventos_favoritos (id_evento, id_usuario, fecha_agregado) VALUES (?, ?, ?)`
        const result = await Empresa(sql_eventos_favoritos, [id_evento, id_usuario, fecha_agregado])

        // Enviamos la respuesta del servidor
        res.status(201).json({ status: 201, message: "Se creó con éxito el Favorito", respuesta: result })
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Ocurrió un error en el servidor' });
    }
}


// Exportación de las funciones
module.exports = {
    getFavoritos,
    getOneFavorito,
    newFavorito,
}