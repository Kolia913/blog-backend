const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 255
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        max: 255
    },
    description:{
       type: String,
       max: 255
    },
    content:{
        type: String,
        min: 6
    },
    created_at:{
       type: Date,
       default: Date.now()
    },
    updated_at:{
        type: Date,
        default: null
    },
    authorId:{
        type: String,
        required: true
    },
    categoryId:{
        type: String,
    },
    imageUrl:{
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Post', PostSchema)