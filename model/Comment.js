const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    postSlug: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        maxlength: 1024,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Comment', CommentSchema)