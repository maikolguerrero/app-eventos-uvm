// Llamamos a la funcion empresa
const { connection, Empresa } = require('../empresa/query_empresa')

// Funcion para listar todos los recordatorios
async function getListarData(req, res) {
    console.log("getListarData");
    let sql_recordatorios = `select * from recordatorios`
    const result = await Empresa(sql_recordatorios)

    //Enviamos la respuesta del servidor
    res.status(200).json({ status: 200, data: result })
}

// Funcion para mostrar 1 solo recordatorio
async function getListarUnoData(req, res) {
    console.log("getListarData");
    const { id } = req.params
    let sql_recordatorios = `select * from recordatorios where id = ${parseInt(id)}`
    const result = await Empresa(sql_recordatorios)

    //Enviamos la respuesta del servidor

    if (result.length === 0) {
        res.status(204).json({ menssage: "No existe el Recordatorio que buscas"})
    } else {
        res.status(200).json({ status: 200, data: result })
    }
}

// Función para crear un nuevo recordatorio
async function newRecordatorio(req, res) {
    console.log("NewRecordatorio");

    if (!req.body.id_evento || !req.body.id_usuario || !req.body.fecha || !req.body.mensaje) {
        return res.status(400).json({ status: "FAILED", data: "Has ingresado datos que no corresponden con los siguientes: id_evento, id_usuario, fecha, mensaje"})
    }

    const data = {
        id_evento: req.body.id_evento,
        id_usuario: req.body.id_usuario,
        fecha: req.body.fecha,
        mensaje: req.body.mensaje
    }

    let sql_recordatorios = `INSERT INTO recordatorios (id_evento, id_usuario, fecha_recordatorio, mensaje) VALUES ('${data.id_evento}', '${data.id_usuario}', '${data.fecha}', '${data.mensaje}')`
    const result = await Empresa(sql_recordatorios)

    // Enviamos la respuesta del servidor
    res.status(201).json({ status: 201, menssage: "Se creo con exito el Recordatorio", respuesta: result})
}

// Función para editar un recordatorio
async function editRecordatorio(req, res) {

    if (!req.body.id || !req.body.fecha || !req.body.mensaje) {
        return res.status(400).json({ status: "FAILED", menssage: "Has ingresado datos que no corresponden con los siguientes: id , fecha, mensaje"})
    }

    const data = {
        id: req.body.id,
        fecha: req.body.fecha,
        mensaje: req.body.mensaje
    }

    let sql_comprobacion = `select * from recordatorios where id = '${data.id}'`
    const result_comprobacion = await Empresa(sql_comprobacion)
    if (result_comprobacion.length === 0) {
        return res.status(400).json({ status: 400, menssage: "No existe el Recordatorio que deseas modificar"})
    }

    let sql_recordatorios = `UPDATE recordatorios SET fecha_recordatorio = '${data.fecha}', mensaje = '${data.mensaje}' WHERE recordatorios.id = ${data.id};`
    const result = await Empresa(sql_recordatorios)

    // Enviamos la respuesta del servidor
    res.status(201).json({ status: 201, menssage: "Se actualizó con exito el Recordatorio"})
}

// Función para eliminar Recordatorio
// async function deleteRecordatorio(req, res) {
//     const { body } = req
    
//     if (!body.id_recordatorio) {
//         return res.status(400).json({ status: 400, menssage: "Has ingresa un propiedad o propiedades que no coinciden con: id_recordatorio"})
//     }

//     let sql_comprobacion = `select * from recordatorios where id = '${body.id_recordatorio}'`
//     const result_comprobacion = await Empresa(sql_comprobacion)
//     if (result_comprobacion.length === 0) {
//         return res.status(200).json({ status: 200, menssage: "No Existe el Recordatorio que deseas eliminar"})
//     }

//     let sql_recordatorios = `DELETE FROM recordatorios WHERE recordatorios.id = ${body.id_recordatorio}`
//     const result = await Empresa(sql_recordatorios)

//     // Enviamos la respuesta del servidor
//     res.status(200).json({status: 200, menssage: "Se eliminó con exito el Recordatorio"})
// }

// Exportación de las funciones
module.exports = {
    getListarData,
    getListarUnoData,
    newRecordatorio,
    editRecordatorio,
}