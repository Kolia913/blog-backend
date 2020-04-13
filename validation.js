const Joi = require('@hapi/joi')

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

const postValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(4).max(255).required(),
        description: Joi.string().max(255),
        content: Joi.string().min(6),
        authorId: Joi.string(),
        categorySlug: Joi.string().required(),
        //image: Joi.required()
    })
    return schema.validate(data)
}

const categoryValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(255).required(),
        color: Joi.string().required(),
        description: Joi.string().max(255)
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.postValidation = postValidation
module.exports.categoryValidation = categoryValidation