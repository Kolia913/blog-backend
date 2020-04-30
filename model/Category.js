const mongoose =  require('mongoose')

const CategorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 255
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        maxlength: 255
    },
    color:{
       type: String,
       required: true
    },
    description:{
       type: String,
       maxlength: 255
    }
})

module.exports = mongoose.model('Category', CategorySchema)