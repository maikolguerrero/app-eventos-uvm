// Importamos la conexion con nuestra base de datos
const connection = require('../../config/connection')

// Función para los errores de las peticiones a la base de datos
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
