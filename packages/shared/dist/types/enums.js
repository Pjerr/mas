"use strict";
exports.__esModule = true;
exports.PublishStatus = exports.ConditionalOperator = exports.PartStatus = exports.EditorValidation = exports.EditorType = void 0;
var EditorType;
(function (EditorType) {
    EditorType["Checkbox"] = "checkbox";
    EditorType["Text"] = "text-input";
    EditorType["Number"] = "number-input";
    EditorType["Select"] = "select";
    EditorType["Datetime"] = "datetime";
    EditorType["MultipleSelect"] = "multiple-select";
    EditorType["Image"] = "image";
    EditorType["Options"] = "options";
    EditorType["Button"] = "button";
    EditorType["CreatableSelect"] = "creatable-select";
})(EditorType = exports.EditorType || (exports.EditorType = {}));
var EditorValidation;
(function (EditorValidation) {
    EditorValidation["None"] = "none";
    EditorValidation["Text"] = "text";
    EditorValidation["Number"] = "number";
    EditorValidation["Email"] = "email";
    EditorValidation["Url"] = "url";
    EditorValidation["Array"] = "array";
    EditorValidation["Select"] = "select";
})(EditorValidation = exports.EditorValidation || (exports.EditorValidation = {}));
var PartStatus;
(function (PartStatus) {
    PartStatus["InStock"] = "in-stock";
    PartStatus["OutOfStock"] = "out-of-stock";
})(PartStatus = exports.PartStatus || (exports.PartStatus = {}));
var ConditionalOperator;
(function (ConditionalOperator) {
    ConditionalOperator["Equals"] = "$eq";
    ConditionalOperator["NotEquals"] = "$ne";
    ConditionalOperator["GreaterThan"] = "$gt";
    ConditionalOperator["LowerThan"] = "$lt";
    ConditionalOperator["AND"] = "$and";
    ConditionalOperator["OR"] = "$or";
    ConditionalOperator["Like"] = "$like";
    // GREATER_THAN_EQUALS = '$gte',
    // LOWER_THAN_EQUALS = '$lte',
    // STARTS = '$starts',
    // ENDS = '$ends',
    ConditionalOperator["Contains"] = "$contains";
    ConditionalOperator["Contained"] = "$contained";
    ConditionalOperator["FullText"] = "$fulltext";
    ConditionalOperator["IN"] = "$in";
    // EXCLUDES = '$excl',
    ConditionalOperator["NOT_IN"] = "$nin";
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
})(ConditionalOperator = exports.ConditionalOperator || (exports.ConditionalOperator = {}));
var PublishStatus;
(function (PublishStatus) {
    PublishStatus["Published"] = "published";
    PublishStatus["Draft"] = "draft";
})(PublishStatus = exports.PublishStatus || (exports.PublishStatus = {}));
