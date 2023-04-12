// Llamamos a la funcion empresa
const { connection, Empresa } = require('../empresa/query_empresa')

// Funcion para la inicialización (limit 4 es para la cantidad de elemntos)
async function getInicializarionData (req, res) {
    console.log("getInicializarionData")
    let sql_eventos= `select * from eventos limit 4`
    const res_eventos = await Empresa(sql_eventos)
    res.json({eventos : res_eventos})
}

// Funcion para traer un solo evento por su id
async function getOneEvento (req, res) {
    const { id } = req.params
    let sql = `select * from eventos where id = ${parseInt(id)}`
    const result = await Empresa(sql)
    res.json(result)
}

// Funcion para traer eventos por su limite de edad
async function getEventoEdad (req, res) {
    const { limite_edad } = req.params
    let sql = `select * from eventos where limite_edad <= ${parseInt(limite_edad)}`
    const result = await Empresa(sql)
    res.json(result)
}

// Funcion para traer eventos por su titulo
async function getEventoTitulo (req, res) {
    const { titulo } = req.params
    let sql = `SELECT * FROM eventos WHERE titulo LIKE '${titulo}%'`;;
    const result = await Empresa(sql)
    res.json(result)
}

// Funcion para traer eventos por lugar
async function getEventoLugar (req, res) {
    const { lugar } = req.params
    let sql = `SELECT * FROM eventos WHERE lugar LIKE '${lugar}%'`;;
    const result = await Empresa(sql)
    res.json(result)
}

// Funcion para traer eventos por el organizador
async function getEventoOrganizador (req, res) {
    const { organizador } = req.params
    let sql = `SELECT * FROM eventos WHERE organizador LIKE '${organizador}%'`;;
    const result = await Empresa(sql)
    res.json(result)
}

// Funcion para traer eventos por su valoracion
async function getEventoValoracion (req, res) {
    const { valoracion } = req.params
    let sql = `select * from eventos where valoracion >= ${parseFloat(valoracion)}`
    const result = await Empresa(sql)
    res.json(result)
}

// Funcion para traer eventos por su Duración
async function getEventoDuracion (req, res) {
    const { duracion } = req.params
    let sql = `SELECT * FROM eventos WHERE duracion LIKE '${duracion}%'`;;
    const result = await Empresa(sql)
    res.json(result)
}

// Funcion para traer eventos por su Fecha
async function getEventoFecha (req, res) {
    const { fecha } = req.params
    let sql = `SELECT * FROM eventos WHERE fecha LIKE '${fecha}%'`;;
    const result = await Empresa(sql)
    res.json(result)
}

// Funcion para traer todos los Eventos
async function getEventos (req, res) {
    let sql = `select * from eventos`
    const result = await Empresa(sql)
    res.json(result)
}

// Funcion para agregar un nuevo Evento
async function newEvento (req, res) {
    const { body, file } = req

    if(file) {
        // Guardamos la direccion de la imagen en una variable y traemos los datos de la bd
        let url = `http://localhost:8080/image/${file.filename}`
        let sql = `insert into eventos(titulo, url_imagen, descripcion, fecha, lugar, organizador, participantes, registro, total_asientos, disponibilidad_asientos, duracion, limite_edad, valoracion) values 
                    (${connection.escape(body.titulo)}, ${connection.escape(url)}, ${connection.escape(body.descripcion)}, ${connection.escape(body.fecha)}, ${connection.escape(body.lugar)}, ${connection.escape(body.organizador)}, ${connection.escape(body.participantes)}, ${connection.escape(body.registro)}, ${connection.escape(body.total_asientos)}, ${connection.escape(body.disponibilidad_asientos)}, ${connection.escape(body.duracion)}, ${connection.escape(body.limite_edad)}, ${connection.escape(body.valoracion)})`

        const result = await Empresa(sql)
        res.json(result)
    }
}


// Exportación de las funciones
module.exports = {
    getInicializarionData,
    getOneEvento,
    getEventos,
    newEvento,
    getEventoEdad,
    getEventoTitulo,
    getEventoLugar,
    getEventoOrganizador,
    getEventoValoracion,
    getEventoDuracion,
    getEventoFecha,
}