export enum EditorType {
    Checkbox = 'checkbox',
    Text = 'text-input',
    Number = 'number-input',
    Select = 'select',
    Datetime = 'datetime',
    MultipleSelect = 'multiple-select',
    Image = 'image',
    Options = 'options',
    Button = 'button',
    CreatableSelect = 'creatable-select',
}

export enum EditorValidation {
    None = 'none',
    Text = 'text',
    Number = 'number',
    Email = 'email',
    Url = 'url',
    Array = 'array',
    Select = 'select',
}

export enum PartStatus {
    InStock = 'in-stock',
    OutOfStock = 'out-of-stock',
}

export enum ConditionalOperator {
    Equals = '$eq',
    NotEquals = '$ne',
    GreaterThan = '$gt',
    LowerThan = '$lt',
    AND = '$and',
    OR = '$or',
    Like = '$like',
    // GREATER_THAN_EQUALS = '$gte',
    // LOWER_THAN_EQUALS = '$lte',
    // STARTS = '$starts',
    // ENDS = '$ends',
    Contains = '$contains',
    Contained = '$contained',
    FullText = '$fulltext',
    IN = '$in',
    // EXCLUDES = '$excl',
    NOT_IN = '$nin',
    // IS_NULL = '$isnull',
    // NOT_NULL = '$notnull',
    // BETWEEN = '$between',
    // EQUALS_LOW = '$eqL',
    // NOT_EQUALS_LOW = '$neL',
    // STARTS_LOW = '$startsL',
    // ENDS_LOW = '$endsL',
    // CONTAINS_LOW = '$contL',
    // EXCLUDES_LOW = '$exclL',
    // IN_LOW = '$inL',
    // NOT_IN_LOW = '$notinL',
}

export enum PublishStatus {
    Published = 'published',
    Draft = 'draft',
}
