import Joi from 'joi';

export const createAttributeOptionValidation = () => {
    return Joi.array().items(
        Joi.object({
            value: Joi.string().min(2).required().messages({
                'string.min': 'needs to have at least 2 characters',
                'string.empty': 'is required',
                'any.required': 'is required',
            }),
            sku: Joi.string().min(2).required().messages({
                'string.min': 'needs to have at least 2 characters',
                'string.empty': 'is required',
                'any.required': 'is required',
            }),
            displayName: Joi.string().min(2).required().messages({
                'string.min': 'needs to have at least 2 characters',
                'string.empty': 'is required',
                'any.required': 'is required',
            }),
        })
    );
};
