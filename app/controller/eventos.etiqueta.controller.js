// Llamamos a la funcion empresa
const { connection, Empresa } = require('../empresa/query_empresa')

// Función para listar todos los eventos_etiquetas
async function getListarEvenEtiqueta(req, res) {

    let sql_etiquetas = `select * from eventos_etiquetas`
    const result = await Empresa(sql_etiquetas)

    //Enviamos la respuesta del servidor
    res.status(200).json({ status: 200, data: result })
}

// Función para mostrar 1 solo Etiqueta
async function getEvenEtiqueta(req, res) {
    
    const { id } = req.params
    let sql_etiquetas = `select * from eventos_etiquetas where id_evento_etiqueta = ${parseInt(id)}`
    const result = await Empresa(sql_etiquetas)

    //Enviamos la respuesta del servidor

    if (result.length === 0) {
        res.status(204).json({ status: 204, menssage: "No existe la relación de evento_etiqueta que buscas"})
    } else {
        res.status(200).json({ status: 200, data: result })
    }
}

// Función para mostrar todas las etiquetas relacionadas a un evento
async function getEvenEtiquetaListar(req, res) {
    
    const { id } = req.params
    const data = []
    let sql_etiquetas = `select * from eventos_etiquetas where id_evento = ${parseInt(id)}`
    const result = await Empresa(sql_etiquetas)

    for (let i = 0; i < result.length; i++) {
        let sql_busqueda = `select * from etiquetas where id = '${parseInt(result[i].id_etiqueta)}'`
        const resultado = await Empresa(sql_busqueda)
        data.push(resultado[0].nombre)
    }
    
    //Enviamos la respuesta del servidor

    if (result.length === 0) {
        res.status(204).json({ status: 204, menssage: "No existe el evento relacionado con etiquetas dentro de evento_etiqueta que buscas"})
    } else {
        res.status(200).json({ status: 200, data: data })
    }
}

// Función para agregar una Etiqueta
async function newEvenEtiqueta(req, res) {
    const { body } = req

    if (!body.id_evento || !body.id_etiqueta) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: id_evento, id_etiqueta"})
    }
    
    let sql_comprobacion = `select * from eventos where id = '${parseInt(body.id_evento)}'`
    let sql_comprobacion_2 = `select * from etiquetas where id = '${parseInt(body.id_etiqueta)}'`
    const result_comprobacion = await Empresa(sql_comprobacion)
    const result_comprobacion_2 = await Empresa(sql_comprobacion_2)

    if (result_comprobacion.length === 0) {
        return res.status(400).json({ status: 400, menssage: "Has registrado el id de un evento que no existe, debes modificarlo"})
    }

    if (result_comprobacion_2.length === 0) {
        return res.status(400).json({ status: 400, menssage: "Has registrado el id de una etiqueta que no existe, debes modificarla"})
    }

    let sql_etiquetas = `INSERT INTO eventos_etiquetas (id_evento, id_etiqueta) VALUES (${parseInt(body.id_evento)}, ${parseInt(body.id_etiqueta)})`
    const result = await Empresa(sql_etiquetas)

    //Enviamos la respuesta del servidor
    res.status(201).json({ status: 201, menssage: "Se creó con éxito la nueva relación evento_etiqueta", data: result})
}

// Función para editar una etiqueta
async function editEvenEtiqueta(req, res) {
    const { body } = req

    if (!body.id_relacion || !body.id_evento || !body.id_etiqueta) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: id_relacion, id_etiqueta, id_evento"})
    }

    let sql_comprobacion = `select * from eventos_etiquetas where id_evento_etiqueta = '${parseInt(body.id_relacion)}'`
    let sql_comprobacion_2 = `select * from eventos where id = '${parseInt(body.id_evento)}'`
    let sql_comprobacion_3 = `select * from etiquetas where id = '${parseInt(body.id_etiqueta)}'`
    const result_comprobacion = await Empresa(sql_comprobacion)
    const result_comprobacion_2 = await Empresa(sql_comprobacion_2)
    const result_comprobacion_3 = await Empresa(sql_comprobacion_3)

    if (result_comprobacion.length === 0) {
        return res.status(400).json({ status: 400, menssage: "No existe la Relación evento_etiqueta que deseas modificar"})
    }

    if (result_comprobacion_2.length === 0) {
        return res.status(400).json({ status: 400, menssage: "Has editado el id de un evento que no existe, debes modificarlo"})
    }

    if (result_comprobacion_3.length === 0) {
        return res.status(400).json({ status: 400, menssage: "Has editado el id de una etiqueta que no existe, debes modificarla"})
    }

    let sql_etiquetas = `UPDATE eventos_etiquetas SET id_evento = '${parseInt(body.id_evento)}', id_etiqueta = '${parseInt(body.id_etiqueta)}' WHERE eventos_etiquetas.id_evento_etiqueta = ${parseInt(body.id_relacion)}`
    const result = await Empresa(sql_etiquetas)

    //Enviamos la respuesta del servidor
    res.status(201).json({ status: 201, menssage: "Se editó con éxito la Relacion evento_etiqueta", data: result})
}

// Función para eliminar una etiqueta
async function deleteEvenEtiqueta(req, res) {
    const { body } = req

    if (!body.id_relacion) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: id_relacion"})
    }

    let sql_comprobacion = `select * from eventos_etiquetas where id_evento_etiqueta = '${parseInt(body.id_relacion)}'`
    const result_comprobacion = await Empresa(sql_comprobacion)
    if (result_comprobacion.length === 0) {
        return res.status(200).json({ status: 200, menssage: "No Existe la Relación evento_etiqueta que deseas eliminar"})
    }

    let sql_etiquetas = `DELETE FROM eventos_etiquetas WHERE eventos_etiquetas.id_evento_etiqueta = ${parseInt(body.id_relacion)}`
    const result = await Empresa(sql_etiquetas)

    //Enviamos la respuesta del servidor
    res.status(200).json({status: 200, menssage: "Se eliminó con exito la Relación evento_etiqueta"})
}

// Exportación de las funciones
module.exports = {
    getListarEvenEtiqueta,
    getEvenEtiqueta,
    newEvenEtiqueta,
    editEvenEtiqueta,
    deleteEvenEtiqueta,
    getEvenEtiquetaListar
}