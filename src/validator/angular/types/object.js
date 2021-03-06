const { OBJECT } = require('./../../default/types/object');
const { validate, validateSync } = require('./../../default/validation/object');

class OBJECT_ANGULAR extends OBJECT {
  constructor(schema, options, defaults) {
    super(schema, options, defaults);
  }

  validate() {
    return async formControl => {
      try {
        const value = formControl.value === '' ? undefined : formControl.value;
        await validate(value, this.options({ validation: true }));
        return null;
      } catch (err) {
        return { validation: err };
      }
    };
  }

  validateSync() {
    return formControl => {
      try {
        const value = formControl.value === '' ? undefined : formControl.value;
        validateSync(value, this.options({ validation: true }));
        return null;
      } catch (err) {
        return { validation: err };
      }
    };
  }
}

exports.OBJECT_ANGULAR = OBJECT_ANGULAR;
exports.ObjectFactory = (schema, options, defaults) =>
  new OBJECT_ANGULAR(schema, options, defaults);
