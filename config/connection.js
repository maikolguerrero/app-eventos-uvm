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

let myConn;
try {
    //Realizamos la conexión pasandole el objeto de conexión
    myConn = mysql.createConnection(ObjectConnection);
  
    myConn.connect((error) => {
      if (error) {
        console.log(`Error al conectar con la base de datos: ${error.message}`);
      } else {
        console.log("La base de datos ha sido conectada exitosamente");
      }
    });
  } catch (error) {
    console.log(`Ha ocurrido un error al crear la conexión: ${error.message}`);
  }

//Exportamos la conexión
module.exports = myConn