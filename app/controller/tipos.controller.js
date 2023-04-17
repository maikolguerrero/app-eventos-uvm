// Llamamos a la funcion empresa
const { connection, Empresa } = require('../empresa/query_empresa')

// Función para listar todos los tipos
async function getListarTipos(req, res) {

    let sql_tipos = `select * from tipos`
    const result = await Empresa(sql_tipos)

    //Enviamos la respuesta del servidor
    res.status(200).json({ status: 200, data: result })
}

// Función para mostrar 1 solo tipo
async function getTipo(req, res) {
    
    const { id } = req.params
    let sql_tipos = `select * from tipos where id = ${parseInt(id)}`
    const result = await Empresa(sql_tipos)

    //Enviamos la respuesta del servidor

    if (result.length === 0) {
        res.status(204).json({ status: 204, menssage: "No existe el Tipo que buscas"})
    } else {
        res.status(200).json({ status: 200, data: result })
    }
}

// Función para agregar un tipo
async function newTipo(req, res) {
    const { body } = req

    if (!body.nombre_tipo) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: nombre_tipo"})
    }
    
    let sql_comprobacion = `select * from tipos where nombre = '${body.nombre_tipo}'`
    const result_comprobacion = await Empresa(sql_comprobacion)
    if (result_comprobacion.length > 0) {
        return res.status(200).json({ status: 200, menssage: "Ya existe el Tipo, por lo tanto no se modificó"})
    }

    let sql_tipos = `INSERT INTO tipos (nombre) VALUES ('${body.nombre_tipo}')`
    const result = await Empresa(sql_tipos)

    //Enviamos la respuesta del servidor
    res.status(201).json({ status: 201, menssage: "Se creó con éxito el nuevo Tipo"})
}

// Función para editar un tipo
async function editTipo(req, res) {
    const { body } = req

    if (!body.nombre_tipo || !body.id_tipo) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: id_tipo, nombre_tipo"})
    }

    let sql_comprobacion = `select * from tipos where id = '${body.id_tipo}'`
    const result_comprobacion = await Empresa(sql_comprobacion)
    if (result_comprobacion.length === 0) {
        return res.status(400).json({ status: 400, menssage: "No existe el Tipo que deseas modificar"})
    }

    let sql_tipos = `UPDATE tipos SET nombre = '${body.nombre_tipo}' WHERE tipos.id = ${parseInt(body.id_tipo)}`
    const result = await Empresa(sql_tipos)

    //Enviamos la respuesta del servidor
    res.status(201).json({ status: 201, menssage: "Se editó con éxito el nuevo Tipo"})
}

// Función para eliminar un tipo
async function deleteTipo(req, res) {
    const { body } = req

    if (!body.id_tipo) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: id_tipo"})
    }

    let sql_comprobacion = `select * from tipos where id = '${body.id_tipo}'`
    const result_comprobacion = await Empresa(sql_comprobacion)
    if (result_comprobacion.length === 0) {
        return res.status(200).json({ status: 200, menssage: "No Existe el Tipo que deseas eliminar"})
    }

    let sql_tipos = `DELETE FROM tipos WHERE tipos.id = ${parseInt(body.id_tipo)}`
    const result = await Empresa(sql_tipos)

    //Enviamos la respuesta del servidor
    res.status(200).json({status: 200, menssage: "Se eliminó con exito el Tipo"})
}

// Exportación de las funciones
module.exports = {
    getListarTipos,
    getTipo,
    newTipo,
    editTipo,
    deleteTipo,
}