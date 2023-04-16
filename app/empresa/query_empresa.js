// Importamos el until, la conexion con nuestra base de datos
const util = require('util')
const connection = require('../../config/connection')
// Creamos una variable para realizar las consultas
const query = util.promisify(connection.query).bind(connection)

// Función para los errores de las peticiones a la base de datos

async function Empresa(sql) {
    try {
        let sql_query = sql
        const res = await query(sql_query)
        return res
    }catch(err) {
        console.log(`Hubo un error : ${err}`)
        return err
    }

async function Empresa(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                console.log(`Hubo un error: ${error}`)
                reject(error)
            } else {
                resolve(results)
            }
        })
    })

}

// Exportamos
module.exports = {
    Empresa,
    connection
}