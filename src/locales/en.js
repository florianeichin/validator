module.exports = {
  default: "Invalid.",
  configuration_error: "Validator configuration error",
  validation_error: "Invalid input parameters and/or values.",
  unknown_locale: "Unknown locale {{locale}}.",
  invalid_schema: "Invalid schema.",
  unknown_schema: "Unknown schema.",
  invalid_custom_type:
    "Cannot add custom type {{name}}. Invalid type {{type}}.",
  duplicate_custom_type:
    "Cannot add custom type. Name {{name}} is already set.",
  unknown_custom_type: "Error getting custom type {{name}}. Unknown type.",
  no_example: "No example provided",
  required: "Required but is {{value}}.",
  wrong_type: "Must be type {{expected}} but is {{actual}}.",
  only: "Only '{{only}}' is allowed.",
  not: "Is not allowed.",
  invalid_function: "Must be a function.",
  invalid_regular_expression: "Must be a regular expression.",
  string_empty: "String is empty.",
  string_min: "Must have at least {{expected}} characters.",
  string_max: "Must have at most {{expected}} characters.",
  string_length: "Must have exactly {{expected}} characters.",
  string_regex_invalid: "Value does not match regular expression.",
  array_empty: "Array is empty.",
  array_min: "Must have at least {{expected}} items.",
  array_max: "Must have at most {{expected}} items.",
  array_length: "Must have exactly {{expected}} items.",
  array_duplicate_items: "Items must be unique.",
  integer_is_number: "Must be type integer but is {{actual}}.",
  integer_min: "Must be at minimum {{expected}}.",
  integer_max: "Must be at maximum {{expected}}.",
  integer_less: "Must be less than {{expected}}.",
  integer_greater: "Must be greater than {{expected}}.",
  integer_positive: "Must be a positive integer.",
  integer_negative: "Must be a negative integer.",
  number_min: "Must be at minimum {{expected}}.",
  number_max: "Must be at maximum {{expected}}.",
  number_less: "Must be less than {{expected}}.",
  number_greater: "Must be greater than {{expected}}.",
  number_positive: "Must be a positive number.",
  number_negative: "Must be a negative number.",
  date_invalid: "Must be a valid date with the format {{format}}.",
  date_min: "Must be at minimum {{min}}.",
  date_max: "Must be at maximum {{max}}.",
  object_invalid_type: "Must be an object.",
  object_min: "Must have at least {{expected}} keys.",
  object_max: "Must have at most {{expected}} keys.",
  object_length: "Must have exactly {{expected}} keys.",
  object_empty: "Object is empty.",
  object_unknown: "Unknown key.",
  condition_gt: "Must be greater than {{keyB}}.",
  condition_gte: "Must be greater than or equal {{keyB}}.",
  condition_lt: "Must be less than {{keyB}}.",
  condition_lte: "Must be less than or equal {{keyB}}.",
  condition_equals: "Must equal {{keyB}}.",
  condition_not_equals: "Must not equal {{keyB}}.",
  condition_xor: "Either {{keyA}} or {{keyB}} must be set.",
  condition_or: "Either {{keyA}} or {{keyB}} can be set.",
  condition_depends_on: "Depends on {{keyB}}.",
  express_invalid_request_object: "Invalid express req object.",
  express_unknown_params: "URI parameters are not allowed.",
  express_unknown_query: "Query parameters are not allowed.",
  express_unknown_body: "Body parameters are not allowed.",
  express_object_or_array: "Only plain object or array is allowed.",
  express_object_or_array_schema: "Must be object or array schema.",
  express_invalid_status_code:
    "Must have status code {{expected}} but has {{actual}}."
};
