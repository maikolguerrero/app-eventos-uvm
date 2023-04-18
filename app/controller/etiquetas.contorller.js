// Llamamos a la funcion empresa
const { connection, Empresa } = require('../empresa/query_empresa')

// Función para listar todos los etiquetas
async function getListarEtiquetas(req, res) {

    let sql_etiquetas = `select * from etiquetas`
    const result = await Empresa(sql_etiquetas)

    //Enviamos la respuesta del servidor
    res.status(200).json({ status: 200, data: result })
}

// Función para mostrar 1 solo Etiqueta
async function getEtiqueta(req, res) {
    
    const { id } = req.params
    let sql_etiquetas = `select * from etiquetas where id = ${parseInt(id)}`
    const result = await Empresa(sql_etiquetas)

    //Enviamos la respuesta del servidor

    if (result.length === 0) {
        res.status(400).json({ status: 400, menssage: "No existe la Etiqueta que buscas"})
    } else {
        res.status(200).json({ status: 200, data: result })
    }
}

// Función para agregar una Etiqueta
async function newEtiqueta(req, res) {
    const { body } = req

    if (!body.nombre_etiqueta) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: nombre_etiqueta"})
    }
    
    let sql_comprobacion = `select * from etiquetas where nombre = '${body.nombre_etiqueta}'`
    const result_comprobacion = await Empresa(sql_comprobacion)
    if (result_comprobacion.length > 0) {
        return res.status(200).json({ status: 200, menssage: "Ya existe la Etiqueta, por lo tanto no se modificó"})
    }

    let sql_etiquetas = `INSERT INTO etiquetas (nombre) VALUES ('${body.nombre_etiqueta}')`
    const result = await Empresa(sql_etiquetas)

    //Enviamos la respuesta del servidor
    res.status(201).json({ status: 201, menssage: "Se creó con éxito la nueva Etiqueta", data: result})
}

// Función para editar una etiqueta
async function editEtiqueta(req, res) {
    const { body } = req

    if (!body.nombre_etiqueta || !body.id_etiqueta) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: id_etiqueta, nombre_etiqueta"})
    }

    let sql_comprobacion = `select * from etiquetas where id = '${parseInt(body.id_etiqueta)}'`
    const result_comprobacion = await Empresa(sql_comprobacion)
    if (result_comprobacion.length === 0) {
        return res.status(400).json({ status: 400, menssage: "No existe la Etiqueta que deseas modificar"})
    }

    let sql_comprobacion_2 = `select * from etiquetas where nombre = '${body.nombre_etiqueta}'`
    const result_comprobacion_2 = await Empresa(sql_comprobacion_2)
    if (result_comprobacion_2.length > 0) {
        return res.status(200).json({ status: 200, menssage: "Ya existe la Etiqueta con ese nombre, por lo tanto no se modificó"})
    }

    let sql_etiquetas = `UPDATE etiquetas SET nombre = '${body.nombre_etiqueta}' WHERE etiquetas.id = ${parseInt(body.id_etiqueta)}`
    const result = await Empresa(sql_etiquetas)

    //Enviamos la respuesta del servidor
    res.status(201).json({ status: 201, menssage: "Se editó con éxito la Etiqueta"})
}

// Función para eliminar una etiqueta
async function deleteEtiqueta(req, res) {
    const { body } = req

    if (!body.id_etiqueta) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: id_etiqueta"})
    }

    let sql_comprobacion = `select * from etiquetas where id = '${parseInt(body.id_etiqueta)}'`
    const result_comprobacion = await Empresa(sql_comprobacion)
    if (result_comprobacion.length === 0) {
        return res.status(200).json({ status: 200, menssage: "No Existe la Etiqueta que deseas eliminar"})
    }

    let sql_etiquetas = `DELETE FROM etiquetas WHERE etiquetas.id = ${parseInt(body.id_etiqueta)}`
    const result = await Empresa(sql_etiquetas)

    //Enviamos la respuesta del servidor
    res.status(200).json({status: 200, menssage: "Se eliminó con exito la Etiqueta"})
}

// Exportación de las funciones
module.exports = {
    getListarEtiquetas,
    getEtiqueta,
    newEtiqueta,
    editEtiqueta,
    deleteEtiqueta
}
