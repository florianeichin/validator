const _ = require('lodash');
const moment = require('moment');
const BASE = require('./base');
const defaults = require('../defaults');

var _options = Symbol();
var _default = Symbol();
var _format = Symbol();

class DATE extends BASE {
  constructor(format, options) {
    super();
    this[_options] = options || {};
  }

  async validate(value, options = {}) {
    options = _.defaults(this[_options], options);

    if (_.isNil(value)) {
      if (this[_default]) return this[_default];
      if (this.isRequired(options)) throw `Required but is ${value}.`;
      return value;
    }

    const format = this[_format] || options.dateFormat || defaults.DATE_FORMAT;

    const date = moment.utc(value, format, true);

    if (!date.isValid()) {
      throw `Not a valid date. Must match format '${format}'`;
    }

    return value;
  }

  format(format) {
    this[_format] = format;
    return this;
  }

  defaultValue(value) {
    const format = this[_format] || this[_options].dateFormat || defaults.DATE_FORMAT;
    const date = moment.utc(value, format, true);
    if (!date.isValid()) {
      throw new Error(`Not a valid date. Must match format '${format}'`);
    }
    this[_default] = value;
    return this;
  }
}

function DateFactory(options) {
  return new DATE(options);
}
module.exports = DateFactory;
