const mongoose =  require('mongoose')

const CategorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 255
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        max: 255
    },
    color:{
       type: String,
       required: true
    },
    description:{
       type: String,
       max: 255
    }
})

module.exports = mongoose.model('Category', CategorySchema)