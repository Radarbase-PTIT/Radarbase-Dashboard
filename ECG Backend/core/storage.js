const multer = require('multer');
const path = require('path')
const fs = require('fs')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = './storage'
        fs.mkdirSync(path, { recursive: true })
        cb(null, 'storage/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending .jpg
    }
})

const upload = multer({storage: storage}); // Files will be stored in the "uploads" directory


module.exports = {
    upload,
}