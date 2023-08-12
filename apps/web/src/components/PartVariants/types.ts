export interface PartVariantsProps {
    part: PartVariant;
}
export interface AttributeOptionResponse {
    displayName: string;
    optionIds: string[];
}

export interface PartialOption {
    id: string;
    displayName: string;
    value: string;
}

export interface PartialVariant {
    id: string;
    options: PartialOption[];
}
export interface PartVariant {
    partId: string;
    attributes: AttributeOptionResponse[];
    variants: PartialVariant[];
}
