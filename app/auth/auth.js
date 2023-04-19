const jwt = require('jsonwebtoken');
const secreto = 'secreto-para-validar-el-token';
let tokensValidos = [];

class Token {
    generarToken(usuario) {
        const payload = {
            sub: usuario._id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            username: usuario.username,
            email: usuario.email,
            rol: usuario.rol,
        };
        const token = jwt.sign(payload, secreto, { expiresIn: '1h' });
        return token;
    }

    verificarToken(req, res, next) {
        // Obtener el token de la cabecera de la solicitud
        const token = req.headers.authorization?.split(' ')[1];
    
        if (!token) {
            // Si no hay token, devolver una respuesta de error
            return res.status(401).json({  status: 401, message: 'No se proporcionó un token de autenticación' });
        }
    
        // Verificar si el token está en el array de tokensValidos
        if (!tokensValidos.includes(token)) {
            return res.status(401).json({ status: 401, message: 'El token de autenticación no es válido' });
        }
    
        // Verificar el token y decodificar su contenido
        try {
            const payload = jwt.verify(token, secreto);
            req.usuario = payload;
            next();
        } catch (error) {
            // Si el token no es válido, devolver una respuesta de error
            return res.status(401).json({ status: 401, message: 'El token de autenticación es inválido' });
        }
    }

    verificarRol(rolesPermitidos) {
        return (req, res, next) => {
            const usuario = req.usuario;
            if (usuario && rolesPermitidos.includes(usuario.rol)) {
                next();
            } else {
                res.status(401).json({ status: 401, message: "No tienes permiso para acceder a esta ruta" });
            }
        };
    }

    agregarTokenValido(token) {
        tokensValidos.push(token);
    }

    eliminarTokenValido(token) {
        tokensValidos = tokensValidos.filter(t => t !== token);
    }
}

const tokenM = new Token();
module.exports = { tokenM };