const multer = require('multer')
const path = require('path')

const DIR = './uploads/'

const storage = multer.diskStorage({
    destination: DIR,
    filename: (req, file, cb) => {
        const fileName = file.fieldname + "_" + Date.now() + "_" + file.originalname
        cb(null, fileName)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
})

function checkFileType(file, cb){
     const fileTypes = /jpeg|jpg|png|gif/
     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
     const mimetype = fileTypes.test(file.mimetype)
     if(mimetype && extname){
         return cb(null, true)
     }else{
         return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
     }
}
module.exports = upload