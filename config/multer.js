// Importamos Multer y path
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    // Definimos la carpeta de destino para los archivos cargados
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../static/image'))
    },
    // Definimos el nombre de archivo para los archivos cargados
    filename: function(req, file, cb) {
        cb(null, `image${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
    // Cortamos para sacar la extención image/jpg
})

// Exportamos
module.exports = storage