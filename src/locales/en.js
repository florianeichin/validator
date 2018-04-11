module.exports = {
  validation_error: 'Bad Request. Input parameters and/or values are wrong.',
  invalid_schema: 'Invalid schema.',
  unknown_schema: 'Unknown schema.',
  invalid_custom_type:
    'Cannot add custom type {{name}}. Invalid type {{type}}.',
  duplicate_custom_type:
    'Cannot add custom type. Name {{name}} is already set.',
  unknown_custom_type: 'Error getting custom type {{name}}. Unknown type.',
  required: 'Required but is {{value}}.',
  wrong_type: 'Must be type {{expected}} but is {{actual}}.',
  invalid_default_value:
    'Default value must be type {{expected}} but is {{actual}}.',
  string_empty: 'String is empty.',
  string_min: 'Must have at least {{expected}} characters.',
  string_max: 'Must have at most {{expected}} characters.',
  string_length: 'Must have exactly {{expected}} characters.',
  array_empty: 'Array is empty.',
  array_min: 'Must have at least {{expected}} items.',
  array_max: 'Must have at most {{expected}} items.',
  array_length: 'Must have exactly {{expected}} items.',
  array_duplicate_items: 'Values must be unique.',
  integer_is_number: 'Must be integer but is {{actual}}.',
  integer_min: 'Must be at minimum {{expected}}.',
  integer_max: 'Must be at maximum {{expected}}.',
  integer_less: 'Must be less than {{expected}}.',
  integer_greater: 'Must be greater than {{expected}}.',
  integer_positive: 'Must be a positive integer.',
  integer_negative: 'Must be a negative integer.',
  number_min: 'Must be at minimum {{expected}}.',
  number_max: 'Must be at maximum {{expected}}.',
  number_less: 'Must be less than {{expected}}.',
  number_greater: 'Must be greater than {{expected}}.',
  number_positive: 'Must be a positive number.',
  number_negative: 'Must be a negative integer.'
};
