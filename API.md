## Validator

If a schema gets checked by a validator it will get the validators options.

- `requiredAsDefault (boolean)`: Sets all parameters of a schema as required if not specified otherwise. Default true.
- `throwValidationError (boolean)`: Throw an error if validation fails. Default true.
- `parseToType (boolean)`: Parse input data to type (e.g. 'true' -> true, '1.2' -> 1.2). Default false.
- `noEmptyStrings (boolean)`: Disallow empty strings. Default true.
- `trimStrings (boolean)`: Remove whitespaces from string. Default true.
- `noEmptyArrays (boolean)`: Disallow empty arrays. Default true.
- `noEmptyObjects (boolean)`: Disallow empty objects. Default true.
- `noUndefinedKeys (boolean)`: Disallow keys that are not defined by the schema. Default true.
- `parseDates (boolean)`: Parse date string to Date objects. Default true.
- `utc (boolean)`: Use UTC to parse dates. Default true.
- `strictDateValidation (boolean)`: Use strict date validation. Datestrings have to match exactly the given format. Default true.

Every schema and type can get own options which will override the ones of its parent.

``` javascript
const validator = eiv.Validator({noEmptyStrings: true});
const schema = validator.Object({
  empty: validator.String({noEmptyStrings: false}),
  notEmpty: validator.String()
});

const data = {
  empty: '',
  notEmpty: 'hi'
}

await validator.validate(schema, data);
// returns data
```

## Types

All types share these functions:

- `required(boolean)`: Is the parameter required.
- `default(value)`: Default value if input is undefined/null. Overwrites `required` and `empty` settings.

``` javascript
validator.Boolean().required(false);
validator.Boolean().default(false);
```

### Array

- `min(integer)`: Minimum length of the array.
- `max(integer)`: Maximum length of the array.
- `length(integer)`: Exact length of the array.
- `empty(boolean)`: If array can be empty. Overwrites options.
- `unique(boolean)`: Only allow unique items (including objects and arrays).

```javascript
validator.Array(validator.String(), options);
validator.Array(validator.String(), options).min(5).max(10);
validator.Array(validator.String(), options).length(5);
validator.Array(validator.String(), options).empty(true);
```

### Boolean

```javascript
validator.Boolean(options);
```

### Date

- `format(string | array)`: Format will get validated with [moment](https://github.com/moment/moment) as utc time in strict mode. Default format is the ISO6801 standard 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'.
- `parse(boolean)`: Parse date string to Date object.
- `min(date)`: Set a minimum valid date.
- `max(date)`: Set a maximum valid date.
- `utc(boolean)`: Overwrite options use UTC. Default true.
- `strict(boolean)`: Overwrite options strict date validation. Default true.

```javascript
validator.Date(format, options);
validator.Date(null, options).format('YYYY-MM-DD');
validator.Date('YYYY-MM-DD').parse(true);
```

### Enum

```javascript
validator.Enum([1,2,3], options);
```

### Integer

- `min(integer)`: Minimum value.
- `max(integer)`: Maximum value.
- `greater(integer)`: Must be greater.
- `less(integer)`: Must be less.
- `positive()`: Must be positive.
- `negative()`: Must be negative.

```javascript
validator.Integer(options);
validator.Integer(options).min(5).max(20);
```

### Number

- `min(number)`: Minimum number.
- `max(number)`: Maximum number.
- `greater(number)`: Must be greater.
- `less(number)`: Must be less.
- `positive()`: Must be positive.
- `negative()`: Must be negative.

```javascript
validator.Number(options);
validator.Number(options).min(0.0).max(5.0);
```

### Object

- `min(integer)`: Minimum number of object properties.
- `max(integer)`: Maximum number of object properties.
- `length(integer)`: Exact number of object properties.
- `empty(boolean)`: If object can be empty. Overwrites options.
- `func(function, ...string)`: Call an async function with values of the given keys.

Add conditions to check multiple values against each other. Navigate to nested keys with a point separated path (e.g. 'nested.child.value').

- `conditions(object)`: Multiple conditions in a json structure.
- `gt(string, string)`: Key a must be greater then key b.
- `gte(string, string)`: Key a must be greater or equal then key b.
- `lt(string, string)`: Key a must be less then key b.
- `lte(string, string)`: Key a must be less or equal then key b.
- `equals(string, string)`: Key a must equal key b.
- `notEquals(string, string)`: Key a must not equal key b.
- `dependsOn(string, string)`: Key a dependsOn key b. Useful for optional parameters.
- `xor(string, string)`: Only one of theses key should be set. Useful for optional parameters.

```javascript
validator.Object({name: validator.String()}, options);
validator.Object({name: validator.String()}, options).min(5).max(10);
validator.Object({name: validator.String()}, options).length(5);
validator.Object({name: validator.String()}, options).empty(true);
validator.Object({name: validator.String(), age: validator.Integer()}, options).func(fn, 'name', 'age');

validator.Object({bigger: validator.Integer(), smaller: validator.Integer()}, options).equals('a', 'b');
validator.Object({
  bigger: validator.Integer(),
  smaller: validator.Integer(),
  child: validator.Object({
    smaller: validator.Integer()
  })
}, options)
  .conditions({
    bigger: {
      gte: smaller
    },
    smaller: {
      equals: 'child.smaller'
    }
  });
```

### Regex

- `min(integer)`: Minimum length of the regex.
- `max(integer)`: Maximum length of the regex.
- `length(integer)`: Exact length of the regex.
- `empty(boolean)`: If string can be empty. Overwrites options.
- `message(string)`: Use a custom message if value does not match regular expression. The default message is 'Value does not match regular expression.'.

```javascript
validator.Regex(/A-Z/, options);
validator.Regex(/A-Z/, options).min(5).max(20);
validator.Regex(/A-Z/, options).length(15);
validator.Regex(/A-Z/, options).empty(true);
validator.Regex(/A-Z/, options).message('Only uppercase letters.');
```

## Request

This is a special object to validate the express req object. It validates params, query and body parameters, with different default settings:

- `params(schema, options)`: Default: Parameters will get parsed to type and are required.
- `query(schema, options)`: Default: Parameters will get parsed to type and are optional.
- `body(schema, options)`: Default: Parameters will not get parsed to type and are required.

You can pass a Object or Array schema to each function or and just an object.

```javascript
const schema = validator.Request()
  .params({
    id: INTEGER()
  })
  .body({
    name: STRING()
  })
  .query(validator.Object({
    deleted: BOOLEAN()
  }))

const req = {
  params: {
    id: '20'
  },
  query: {},
  body: {
    name: 'Jane Doe'
  }
}

await validator.validate(schema, req);
/*
{
  params: {
    id: 20
  },
  query: {},
  body: {
    name: 'Jane Doe'
  }
}
*/
```

### String

- `min(integer)`: Minimum length of the string.
- `max(integer)`: Maximum length of the string.
- `length(integer)`: Exact length of the string.
- `empty(boolean)`: If string can be empty. Overwrites options.
- `trim(boolean)`: Trim whitespaces from string. Overwrites options.

```javascript
validator.String(options);
validator.String(options).min(5).max(20);
validator.String(options).length(15);
validator.String(options).empty(true);
```

## Express middleware

By default the Validator throws an error if the validation fails. It's recommended to wrap every route with an [async middleware](https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016) that catches the error and next it to an error handler middleware. Before this error handling middleware, you can use the provided middleware of this package.

The error middleware responds with a status code 400 and a json if the nexted error is an ValidationError object. Otherwise it will next the error.

options:

- `message (string)`: Define the error message.
- `details (boolean)`: Send details about validation failures. Default true.
- `next (boolean)`: Next the error after sending the response. Default false.

``` javascript
const eiv = require('@korbiniankuhn/validator');

app.use(eiv.middleware());

app.use(eiv.middleware({
  message: 'The input validation failed.',
  details: false,
  next: true
}));
```

## Example

This example shows how easy input validation gets. Due to the async middleware no try/catch block is required and only a single line of code at the beginning of the routes controller is necessary. The application is very resilient as every exception will be handled by the error middlewares that even internal server errors will result in an obscured response.

```javascript
const express = require('express');
const eiv = require('@korbiniankuhn/validator');
const app = express();

// Middleware to next all exception
const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Initialize the validator object
const validator = eiv.Validator();

// Define a schema for login data
const loginSchema = validator.Request()
  .body({
    email: validator.String(),
    password: validator.String()
  })

// Login route controller
app.post('/login', asyncMiddleware(async (req, res) => {
  await validator.validate(loginSchema, req);
  if (email === 'jan.doe@example.com' && password === 'secret') {
    res.send('success');
  } else {
    res.send('invalid credentials');
  }
}));

// Sent response on validation errors
app.use(eiv.middleware());

// Error handler
app.use((err, req, res) => {
  if (!res.headerSent) {
    res.send('Something went wrong');
  }
  // Do logging here
  console.log(err);
})

```

## Mongoose schema validation

The validator can also be used for the validation of mongoose schemas.

``` javascript
const schema = new Schema({
  name: {
    type: String,
    index: true,
    required: true,
    validate: async (v) => {
      await validator.validate(validator.String().min(5).max(50), v);
    }
  },
  age: {
    type: Integer,
    validate: async (v) => {
      await validator.validate(validator.Integer().greater(0), v);
    }
  },
});
```