// Llamamos a la funcion empresa
const { Empresa } = require('../empresa/query_empresa')

class UsuariosModel {
  async listar() {
    try {
      let sql_usuarios = `select * from usuarios`;
      const result = await Empresa(sql_usuarios);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Hubo un error al obtener la lista de usuarios.');
    }
  }

  async obtenerPorId(id) {
    try {
      let sql_usuarios = `select * from usuarios where id = ${parseInt(id)}`;
      const result = await Empresa(sql_usuarios);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Hubo un error al obtener el usuario.");
    }
  }

  async obtenerPorUsername(username) {
    const sql = 'SELECT * FROM usuarios WHERE username = ?';
    try {
      const result = await Empresa(sql, [username]);
      return result;
    } catch (error) {
      console.log(`Hubo un error: ${error}`);
      throw new Error("Error al buscar el usuario");
    }
  }

  async obtenerPorEmail(email) {
    try {
      let sql = `SELECT * FROM usuarios WHERE email = ?`;
      const result = await Empresa(sql, [email]);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Hubo un error al buscar el usuario por su email.');
    }
  }

  async listarPorRol(rol) {
    try {
      const sql = "SELECT * FROM usuarios WHERE rol = ?";
      const results = await Empresa(sql, [rol]);
      return results;
    } catch (error) {
      console.error(error);
      throw new Error('Hubo un error al obtener los usuarios por rol.');
    }
  }

  async crear(nombre, apellido, genero, cedula, telefono, email, username, password, recibir_notificaciones, url_avatar, rol) {
    let sql_usuarios = `INSERT INTO usuarios (nombre, apellido, genero, cedula, telefono, email, username, password, recibir_notificaciones, url_avatar, rol, fecha_creacion)
                        VALUES ('${nombre}', '${apellido}', '${genero}', '${cedula}', '${telefono}', '${email}', '${username}', '${password}', '${recibir_notificaciones}', '${url_avatar}', '${rol}', NOW())`
    const result = await Empresa(sql_usuarios)
    return result;
  }

  async editar(campos, id) {
    let sql = `UPDATE usuarios SET `;
    let values = [];

    let i = 0;
    for (const [key, value] of Object.entries(campos)) {
      sql += `${key} = ?`;
      values.push(value);
      i++;

      if (i < Object.keys(campos).length) {
        sql += `, `;
      }
    }

    values.push(id);
    sql += ` WHERE id = ?`;

    try {
      const result = await Empresa(sql, values);
      return result;
    } catch (error) {
      throw new Error('Hubo un error al editar un usuario.');
    }
  }

  async editarUsername(id, username) {
    const sql = `UPDATE usuarios SET username = ${username} WHERE id = ${id}`;

    try {
      const result = await Empresa(sql);
      return result;
    } catch (error) {
      throw new Error('Hubo un error al editar el username de un usuario.');
    }
  }

  async editarPassword(id, hashedPassword) {
    const sql = `UPDATE usuarios SET password = ? WHERE id = ?`;
    const values = [hashedPassword, id];

    try {
      const result = await Empresa(sql, values);
      return result;
    } catch (error) {
      throw new Error('Hubo un error al editar la contraseña de un usuario.');
    }
  }

  async eliminar(id) {
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    const result = await Empresa(sql, [id]);
    return result.affectedRows === 1;
  }

  async verificarPassword(id, password) {
    const sql = `SELECT * FROM usuarios WHERE id = ${id} AND password = '${password}'`;
    try {
      const result = await Empresa(sql);
      return result.length == 1;
    } catch (error) {
      throw new Error('Hubo un error al verificar la contraseña del usuario.');
    }
  }
}

const usuariosM = new UsuariosModel();
module.exports = usuariosM;
