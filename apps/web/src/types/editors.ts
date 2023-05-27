import TextEditor from '@/components/Editors/TextEditor';
import Joi from 'joi';
import {
    ControllerFieldState,
    ControllerRenderProps,
    FieldPath,
    FieldValues,
    UseFormStateReturn,
} from 'react-hook-form';
import { EditorType, EditorValidation } from 'shared';
import { PropertyMetadata } from '@/lib/metadata';
import { NumberEditor } from '@/components/Editors/NumberEditor';
import CheckboxEditor from '@/components/Editors/CheckboxEditor';
import SelectEditor from '@/components/Editors/SelectEditor';
import MultipleSelectEditor from '@/components/Editors/MultipleSelectEditor';
import SelectOptionsEditor from '@/components/Editors/SelectOptionsEditor';

export type EditorProps = {
    field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
    metadata: PropertyMetadata;
};

export const EditorMap: Record<
    EditorType,
    ((props: EditorProps) => React.ReactElement) | null
> = {
    [EditorType.Options]: null,
    [EditorType.Text]: TextEditor,
    [EditorType.Number]: NumberEditor,
    [EditorType.Checkbox]: CheckboxEditor,
    [EditorType.Select]: SelectEditor,
    [EditorType.MultipleSelect]: MultipleSelectEditor,
    [EditorType.Image]: TextEditor,
    [EditorType.Datetime]: TextEditor,
    [EditorType.Button]: SelectOptionsEditor,
};

export type EditorComponents = keyof typeof EditorMap;

export const EditorValidationMap: Record<EditorValidation, Joi.AnySchema> = {
    [EditorValidation.None]: Joi.any(),
    [EditorValidation.DecimalNumber]: Joi.number()
        .positive()
        .empty()
        .required()
        .messages({
            'any.required': 'is required',
            'number.base': 'must be a number',
            'number.empty': 'cant be empty',
            'number.positive': 'must be a positive number',
        }),
    [EditorValidation.IntegerNumber]: Joi.number()
        .integer()
        .positive()
        .empty()
        .required()
        .messages({
            'any.required': 'is required',
            'number.base': 'must be a number',
            'number.positive': 'must be a positive number',
            'number.empty': 'cant be empty',
        }),
    [EditorValidation.Email]: Joi.string().empty().required().messages({
        'any.required': 'is required',
        'string.empty': 'cant be empty',
        'string.base': 'must be a string',
        'string.email': 'must be an email',
    }),
    [EditorValidation.Url]: Joi.string().empty().required().messages({
        'string.empty': 'cant be empty',
        'any.required': 'is required',
        'base.string': 'must be a string',
    }),
    [EditorValidation.Letters]: Joi.string()
        .regex(/^[^!@#$%^&*()_+=[{\]};:'",<.>/?\\| ]\S*/)
        .message('cant start with special character')
        .required()
        .messages({
            'string.empty': 'cant be empty',
            'any.required': 'is required',
            'base.string': 'must be a string',
        }),
    [EditorValidation.AY09]: Joi.string()
        .empty()
        .regex(/^[^!@#$%^&*()_+=[{\]};:'",<.>/?\\| ]\S*/)
        .message('cant start with special character')
        .required()
        .messages({
            'any.required': 'is required',
            'string.empty': 'cant be empty',
            'base.string': 'must be a string',
        }),
    [EditorValidation.Array]: Joi.array().required().messages({
        'any.required': 'is required',
    }),
    [EditorValidation.Select]: Joi.string().required().messages({
        'any.required': 'is required',
    }),
};
