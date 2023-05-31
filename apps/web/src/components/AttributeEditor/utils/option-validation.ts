import Joi from 'joi';

export const createAttributeOptionValidation = () => {
    return Joi.array().items(
        Joi.object({
            value: Joi.string().min(2).required().messages({
                'string.min': 'needs to have at least 2 characters',
                'string.empty': 'is required',
                'any.required': 'is required',
            }),
            price: Joi.number().positive().empty().required().messages({
                'any.required': 'is required',
                'number.base': 'must be a number',
                'number.empty': 'cant be empty',
                'number.positive': 'must be a positive number',
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
