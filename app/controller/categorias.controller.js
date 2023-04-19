// Llamamos a la funcion empresa
const { connection, Empresa } = require('../empresa/query_empresa')

// Función para listar todos los categorias
async function getListarCategorias(req, res) {

    let sql_categorias = `select * from categorias`
    const result = await Empresa(sql_categorias)

    //Enviamos la respuesta del servidor
    res.status(200).json({ status: 200, data: result })
}

// Función para mostrar 1 solo categoria
async function getCategoria(req, res) {
    
    const { id } = req.params
    let sql_categorias = `select * from categorias where id = ${parseInt(id)}`
    const result = await Empresa(sql_categorias)

    //Enviamos la respuesta del servidor

    if (result.length === 0) {
        res.status(204).json({ status: 204, menssage: "No existe la Categoria que buscas"})
    } else {
        res.status(200).json({ status: 200, data: result })
    }
}

// Función para agregar un tipo
async function newCategoria(req, res) {
    const { body } = req

    if (!body.nombre_categoria) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: nombre_categoria"})
    }
    
    let sql_comprobacion = `select * from categorias where nombre = '${body.nombre_categoria}'`
    const result_comprobacion = await Empresa(sql_comprobacion)
    if (result_comprobacion.length > 0) {
        return res.status(400).json({ status: 400, menssage: "Ya existe la Categoria, por lo tanto no se modificó"})
    }

    let sql_categorias = `INSERT INTO categorias (nombre) VALUES ('${body.nombre_categoria}')`
    const result = await Empresa(sql_categorias)

    //Enviamos la respuesta del servidor
    res.status(201).json({ status: 201, menssage: "Se creó con éxito la nueva Categoria"})
}

// Función para editar un tipo
async function editCategoria(req, res) {
    const { body } = req

    if (!body.nombre_categoria || !body.id_categoria) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: id_categoria, nombre_categoria"})
    }

    let sql_comprobacion = `select * from categorias where id = '${body.id_categoria}'`
    const result_comprobacion = await Empresa(sql_comprobacion)
    if (result_comprobacion.length === 0) {
        return res.status(400).json({ status: 400, menssage: "No existe la Categoria que deseas modificar"})
    }

    let sql_comprobacion_2 = `select * from categorias where nombre = '${body.nombre_categoria}'`
    const result_comprobacion_2 = await Empresa(sql_comprobacion_2)
    if (result_comprobacion_2.length > 0) {
        return res.status(400).json({ status: 400, menssage: "Ya existe la Categoria con ese Nombre, por lo tanto no se modificó"})
    }

    let sql_categorias = `UPDATE categorias SET nombre = '${body.nombre_categoria}' WHERE categorias.id = ${parseInt(body.id_categoria)}`
    const result = await Empresa(sql_categorias)

    //Enviamos la respuesta del servidor
    res.status(201).json({ status: 201, menssage: "Se editó con éxito la Categoria"})
}

// Función para eliminar un tipo
async function deleteCategoria(req, res) {
    const { body } = req

    if (!body.id_categoria) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: id_categoria"})
    }

    let sql_comprobacion = `select * from categorias where id = '${body.id_categoria}'`
    const result_comprobacion = await Empresa(sql_comprobacion)
    if (result_comprobacion.length === 0) {
        return res.status(200).json({ status: 200, menssage: "No Existe la Categoria que deseas eliminar"})
    }

    let sql_categorias = `DELETE FROM categorias WHERE categorias.id = ${parseInt(body.id_categoria)}`
    const result = await Empresa(sql_categorias)

    //Enviamos la respuesta del servidor
    res.status(200).json({status: 200, menssage: "Se eliminó con exito la Categoria"})
}

// Exportación de las funciones
module.exports = {
    getListarCategorias,
    getCategoria,
    newCategoria,
    editCategoria,
    deleteCategoria
}