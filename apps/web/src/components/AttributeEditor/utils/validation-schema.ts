import Joi from 'joi';
import { createAttributeOptionValidation } from './option-validation';

export const createAttributeValidationSchema = () => {
    const options = createAttributeOptionValidation();

    return Joi.object({
        displayName: Joi.string().min(4).required().messages({
            'string.min': 'needs to have at least 4 characters',
            'string.empty': 'is required',
            'any.required': 'is required',
        }),
        editorType: Joi.required().messages({
            'any.required': 'is required',
        }),
        editorValidation: Joi.required().messages({
            'any.required': 'is required',
        }),
        options,
    });
};
