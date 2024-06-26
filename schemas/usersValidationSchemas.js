import Joi from "joi";

export const userValidationSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
    token: Joi.string(),
});

export const subscriptionValidationSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
});
