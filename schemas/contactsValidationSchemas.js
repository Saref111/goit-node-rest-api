import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(15).required(),
    favorite: Joi.boolean().default(false),
})

export const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().min(10).max(15),
    favorite: Joi.boolean(),
});

export const updateContactStatusSchema = Joi.object({
    favorite: Joi.boolean().required(),
});
