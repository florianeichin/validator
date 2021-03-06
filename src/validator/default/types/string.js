const {
  defaultToAny,
  isRegExp,
  removeUndefinedProperties
} = require('./../../../utils/lodash');
const { ANY } = require('./any');
const { validate, validateSync } = require('./../validation/string');

class STRING extends ANY {
  constructor(options, defaults) {
    super(options, defaults);
    this._empty = defaultToAny(
      options.emptyStrings,
      defaults.emptyStrings,
      true
    );
    this._trim = defaultToAny(options.trimStrings, defaults.trimStrings, false);
  }

  options(options = {}) {
    const settings = {
      allowed: this._allowed,
      required: this._required,
      parse: this._parse,
      only: this._only,
      not: this._not,
      trim: this._trim,
      empty: this._empty,
      min: this._min,
      max: this._max,
      length: this._length
    };
    if (options.validation) {
      return removeUndefinedProperties({
        ...settings,
        defaultValue: this._default,
        message: this._message,
        func: this._func,
        regex: this._regex
      });
    } else {
      return removeUndefinedProperties({
        ...settings,
        type: 'string',
        description: this._description,
        example: this.example(),
        default: this._default,
        pattern: this._regex ? this._regex.pattern : undefined
      });
    }
  }

  async validate(value) {
    return validate(value, this.options({ validation: true }));
  }

  validateSync(value) {
    return validateSync(value, this.options({ validation: true }));
  }

  min(length) {
    this._min = length;
    return this;
  }

  max(length) {
    this._max = length;
    return this;
  }

  length(length) {
    this._length = length;
    return this;
  }

  empty(boolean) {
    this._empty = boolean;
    return this;
  }

  trim(boolean) {
    this._trim = boolean;
    return this;
  }

  regex(pattern, locales = {}) {
    if (!isRegExp(pattern)) {
      throw this._message.error('invalid_regular_expression');
    }
    this._regex = {
      pattern,
      locales
    };
    return this;
  }

  // TODO email
  // email({remove}) {
  //   return this;
  // }

  // TODO alphanum
  // alphanum() {
  //   return this;
  // }

  // TODO alphabetic
  // alphabetic() {
  //   return this;
  // }

  // TODO password
  // password({ numbers, specialChars }) {
  //   return this;
  // }

  // TODO uuid
  // uuid(version = "v4") {
  //   return this;
  // }

  // TODO lowercase
  // lowercase() {
  //   return this;
  // }

  // TODO uppercase
  // uppercase() {
  //   return this;
  // }

  // TODO replace
  // replace() {
  //   return this;
  // }

  // TODO words
  // words() {
  //   return this;
  // }

  // TODO split
  // split() {
  //   return this;
  // }

  // TODO deburr
  // deburr() {
  //   return this;
  // }

  // TODO escape
  // escape() {
  //   return this;
  // }

  // TODO mongoDbId
  // mongoDbId() {
  //   return this;
  // }

  // TODO uri
  // uri() {
  //   return this;
  // }

  // TODO hex
  // hex() {
  //   return this;
  // }
}

exports.STRING = STRING;
exports.StringFactory = (options = {}, defaults = {}) =>
  new STRING(options, defaults);
