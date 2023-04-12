// Llamamos a la funcion empresa
const { connection, Empresa } = require('../empresa/query_empresa')

// Función para listar todos los Registros
async function getListarRegistros(req, res) {
    let sql_tipos = `select * from registro_de_usuarios_en_eventos`
    const result = await Empresa(sql_tipos)

    //Enviamos la respuesta del servidor
    res.status(200).json({ status: 200, data: result })
}

// Función para mostrar 1 solo Registro
async function getRegistro(req, res) {
    const { id } = req.params
    let sql_tipos = `select * from registro_de_usuarios_en_eventos where id = ${parseInt(id)}`
    const result = await Empresa(sql_tipos)

    //Enviamos la respuesta del servidor

    if (result.length === 0) {
        res.status(204).json({ status: 204, menssage: "No existe el Registro que buscas"})
    } else {
        res.status(200).json({ status: 200, data: result })
    }
}

// Función para agregar un Registro
async function newRegistro(req, res) {
    const { body } = req

    if (!body.id_usuario || !body.id_evento || !body.id_ticket || !body.cantidad) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: id_usuario, id_evento, id_ticket, cantidad"})
    }
    
    let sql_comprobacion = `select * from tickets where id = ${parseInt(body.id_ticket)}`
    const result_comprobacion = await Empresa(sql_comprobacion)
    if (result_comprobacion.length === 0) {
        return res.status(400).json({ status: 400, menssage: "No fue posible registrarse en el evento, ya que el ticket que deseas no existe"})
    } else {
        let tickets_restantes = parseInt(result_comprobacion[0].tickets_disponibles) - parseInt(body.cantidad)
        if (tickets_restantes <= 0) {
            return res.status(400).json({ status: 400, menssage: "No fue posible registrarse en el evento, ya que la cantidad de tickets que deseas no estan disponibles"})
        } 
    }
    
    let total_ticket = parseInt(result_comprobacion[0].tickets_disponibles) - parseInt(body.cantidad)
    console.log(total_ticket)
    let sql_actualizar = `UPDATE tickets SET tickets_disponibles = ${total_ticket} WHERE tickets.id = ${parseInt(body.id_ticket)}`
    const result_actualizar = await Empresa(sql_actualizar)

    let sql_tipos = `INSERT INTO registro_de_usuarios_en_eventos (id_usuario, id_evento, id_ticket, cantidad, fecha_registro) VALUES (${parseInt(body.id_usuario)}, ${parseInt(body.id_evento)}, ${parseInt(body.id_ticket)}, ${parseInt(body.cantidad)}, current_timestamp());`
    const result = await Empresa(sql_tipos)

    //Enviamos la respuesta del servidor
    res.status(201).json({ status: 201, menssage: "Se creó con éxito el nuevo Registro de evento"})
}

// Función para editar un Registro
async function editRegistro(req, res) {
    const { body } = req

    if (!body.id_registro || !body.cantidad) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: id_registro, cantidad"})
    }

    let sql_comprobacion = `select * from registro_de_usuarios_en_eventos where id = ${parseInt(body.id_registro)}`
    const result_comprobacion = await Empresa(sql_comprobacion)

    if (result_comprobacion.length === 0) {
        return res.status(400).json({ status: 400, menssage: "No existe el Registro que deseas modificar"})
    }

    if (result_comprobacion[0].cantidad > body.cantidad) {
        var nueva_cantidad = parseInt(result_comprobacion[0].cantidad) - parseInt(body.cantidad)

        

        let sql_ticket = `select * from tickets where id = ${parseInt(result_comprobacion[0].id_ticket)}`
        const resultado_busqueda = await Empresa(sql_ticket)

        if (resultado_busqueda[0].tickets_disponibles > nueva_cantidad) {
            let sql_tickets = `UPDATE tickets SET tickets_disponibles = ${parseInt(resultado_busqueda[0].tickets_disponibles + nueva_cantidad)} WHERE tickets.id = ${parseInt(result_comprobacion[0].id_ticket)}`
            const consulta = await Empresa(sql_tickets)
        } else {
            
            return res.status(400).json({ status: 400, menssage: "No fue posible registrarse en el evento, ya que la cantidad de tickets que deseas no estan disponibles"})
        }
    }else {
        var nueva_cantidad = parseInt(body.cantidad) - parseInt(result_comprobacion[0].cantidad)
        
        let sql_ticket = `select * from tickets where id = ${parseInt(result_comprobacion[0].id_ticket)}`
        const resultado_busqueda = await Empresa(sql_ticket)

        if (resultado_busqueda[0].tickets_disponibles > nueva_cantidad) {
            let sql_tickets = `UPDATE tickets SET tickets_disponibles = ${parseInt(resultado_busqueda[0].tickets_disponibles - nueva_cantidad)} WHERE tickets.id = ${parseInt(result_comprobacion[0].id_ticket)};`
            const consulta = await Empresa(sql_tickets)
        } else {
            return res.status(400).json({ status: 400, menssage: "No fue posible registrarse en el evento, ya que la cantidad de tickets que deseas no estan disponibles"})
        }
    }

    let sql_tipos = `UPDATE registro_de_usuarios_en_eventos SET cantidad = ${parseInt(body.cantidad)} WHERE registro_de_usuarios_en_eventos.id = ${parseInt(body.id_registro)}`
    const result = await Empresa(sql_tipos)

    //Enviamos la respuesta del servidor
    res.status(201).json({ status: 201, menssage: "Se editó con éxito el nuevo Registro de evento"})
}

// Función para eliminar un Registro
async function deleteRegistro(req, res) {
    const { body } = req

    if (!body.id_registro) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: id_registro"})
    }

    let sql_comprobacion = `select * from registro_de_usuarios_en_eventos where id = ${parseInt(body.id_registro)}`
    const result_comprobacion = await Empresa(sql_comprobacion)
    if (result_comprobacion.length === 0) {
        return res.status(200).json({ status: 200, menssage: "No Existe el Registro que deseas eliminar"})
    }

    let sql_ticket = `UPDATE tickets SET tickets_disponibles = tickets.tickets_disponibles + ${parseInt(result_comprobacion[0].cantidad)} WHERE tickets.id = ${parseInt(result_comprobacion[0].id_ticket)};`
    const consulta = await Empresa(sql_ticket)

    let sql_tickets = `DELETE FROM registro_de_usuarios_en_eventos WHERE registro_de_usuarios_en_eventos.id = ${parseInt(body.id_registro)}`
    const result = await Empresa(sql_tickets)

    //Enviamos la respuesta del servidor
    res.status(200).json({status: 200, menssage: "Se eliminó con éxito el Ticket"})
}

// Exportación de las funciones
module.exports = {
    getListarRegistros,
    getRegistro,
    newRegistro,
    editRegistro,
    deleteRegistro,
}