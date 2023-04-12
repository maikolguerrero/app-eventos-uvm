//Importacion de mysql y datos declarados de la bd
const mysql = require('mysql')
const mysql_data = require('./mysql_data.json')

//Creamos un objeto para la conexion con los datos declarados de la base de datos
const ObjectConnection = {
    host : mysql_data.mysql.host,
    port : mysql_data.mysql.port,
    user : mysql_data.mysql.user,
    password : mysql_data.mysql.pass,
    database : mysql_data.mysql.database
}

//Realizamos la conexión pasandole el objeto de conexión
const myConn = mysql.createConnection(ObjectConnection)

if(myConn) {
    console.log("La base de datos ah sido conectatda exitosamente")
}

//Exportamos la conexión
module.exports = myConn