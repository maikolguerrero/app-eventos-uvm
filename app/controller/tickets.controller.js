// Llamamos a la funcion empresa
const { connection, Empresa } = require('../empresa/query_empresa')

// Función para listar todos los tickets
async function getListarTickets(req, res) {

    let sql_tickets = `select * from tickets`
    const result = await Empresa(sql_tickets)

    //Enviamos la respuesta del servidor
    res.status(200).json({ status: 200, data: result })
}

// Función para mostrar 1 solo ticket
async function getTicket(req, res) {
    const { id } = req.params
    let sql_tickets = `select * from tickets where id = ${parseInt(id)}`
    const result = await Empresa(sql_tickets)

    //Enviamos la respuesta del servidor

    if (result.length === 0) {
        res.status(204).json({ status: 204, menssage: "No existe el Ticket que buscas"})
    } else {
        res.status(200).json({ status: 200, data: result })
    }
}

// Función para agregar un ticket
async function newTicket(req, res) {
    const { body } = req

    if (!body.id_evento || !body.tipo_ticket || !body.precio_ticket || !body.descripcion_ticket || !body.tickets_disponibles) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: id_evento, tipo_ticket, precio_ticket, descripcion_ticket, tickets_disponibles"})
    }
    
    let sql_comprobacion = `select * from eventos where id = '${parseInt(body.id_evento)}'`
    const result_comprobacion = await Empresa(sql_comprobacion)

    if (result_comprobacion.length === 0) {
        return res.status(400).json({ status: 400, menssage: "Has registrado el id de un evento que no existe, debes modificarlo"})
    }

    let sql_tickets = `INSERT INTO tickets (id_evento, tipo, precio, descripcion, tickets_disponibles) VALUES (${parseInt(body.id_evento)}, '${body.tipo_ticket}', '${body.precio_ticket}', '${body.descripcion_ticket}', ${body.tickets_disponibles});`
    const result = await Empresa(sql_tickets)

    //Enviamos la respuesta del servidor
    res.status(201).json({ status: 201, menssage: "Se creó con éxito el nuevo Ticket"})
}

// Función para editar un ticket
async function editTicket(req, res) {
    const { body } = req

    if (!body.id_ticket || !body.id_evento || !body.tipo_ticket || !body.precio_ticket || !body.descripcion_ticket || !body.tickets_disponibles) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: id_ticket, id_evento, tipo_ticket, precio_ticket, descripcion_ticket, tickets_disponibles"})
    }

    let sql_comprobacion = `select * from tickets where id = '${body.id_ticket}'`
    const result_comprobacion = await Empresa(sql_comprobacion)
    if (result_comprobacion.length === 0) {
        return res.status(400).json({ status: 400, menssage: "No existe el Ticket que deseas modificar"})
    }
    
    let sql_comprobacion_2 = `select * from eventos where id = '${parseInt(body.id_evento)}'`
    const result_comprobacion_2 = await Empresa(sql_comprobacion_2)

    if (result_comprobacion_2.length === 0) {
        return res.status(400).json({ status: 400, menssage: "Has registrado el id de un evento que no existe, debes modificarlo"})
    }


    let sql_tickets = `UPDATE tickets SET id_evento = ${body.id_evento}, tipo = '${body.tipo_ticket}', precio = ${parseInt(body.precio_ticket)}, descripcion = '${body.descripcion_ticket}', tickets_disponibles = ${parseInt(body.tickets_disponibles)} WHERE tickets.id = ${parseInt(body.id_ticket)};`
    const result = await Empresa(sql_tickets)

    //Enviamos la respuesta del servidor
    res.status(201).json({ status: 201, menssage: "Se editó con éxito el nuevo Ticket"})
}

// Función para eliminar un ticket
async function deleteTicket(req, res) {
    const { body } = req

    if (!body.id_ticket) {
        return res.status(400).json({ status: 400, menssage: "Has ingresado propiedades que no coinciden con: id_ticket"})
    }

    let sql_comprobacion = `select * from tickets where id = '${body.id_ticket}'`
    const result_comprobacion = await Empresa(sql_comprobacion)
    if (result_comprobacion.length === 0) {
        return res.status(200).json({ status: 200, menssage: "No Existe el Ticket que deseas eliminar"})
    }

    let sql_tickets = `DELETE FROM tickets WHERE tickets.id = ${parseInt(body.id_ticket)}`
    const result = await Empresa(sql_tickets)

    //Enviamos la respuesta del servidor
    res.status(200).json({status: 200, menssage: "Se eliminó con exito el Ticket"})
}

// Exportación de las funciones
module.exports = {
    getListarTickets,
    getTicket,
    newTicket,
    editTicket,
    deleteTicket,
}
