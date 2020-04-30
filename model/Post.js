const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 255
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        maxlength: 255
    },
    description:{
       type: String,
       maxlength: 255
    },
    content:{
        type: String,
        minlength: 6
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
    categorySlug:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Post', PostSchema)