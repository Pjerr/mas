import Joi from 'joi';

export const createManufacturerValidationSchema = () => {
    return Joi.object({
        name: Joi.string().min(2).required().messages({
            'string.min': 'needs to have at least 4 characters',
            'string.empty': 'is required',
            'any.required': 'is required',
        }),
    });
};
