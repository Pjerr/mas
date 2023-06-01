import { Attribute } from '@/store/api/endpoints';
import { EditorValidationMap } from '@/types/editors';
import Joi, { AnySchema } from 'joi';
import { EditorValidation } from 'shared';

export const createValidationSchema = (attributes: Attribute[]) => {
    const properties: Record<string, AnySchema> = {};

    attributes.map((attribute) => {
        const validationType =
            attribute.editorValidation ?? EditorValidation.None;

        const validationRule = EditorValidationMap[validationType];

        properties[attribute.propertyKey] = validationRule;
    });

    return Joi.object({
        name: Joi.string().min(4).required().messages({
            'string.min': 'needs to have at least 4 characters',
            'string.empty': 'is required',
            'any.required': 'is required',
        }),
        status: Joi.required().messages({
            'any.required': 'is required',
        }),
        properties: Joi.object().keys({
            ...properties,
        }),
    });
};
