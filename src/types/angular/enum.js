const { ENUM, validateEnum } = require('../enum');

class ENUM_ANGULAR extends ENUM {
  constructor(values, options, defaults) {
    super(values, options, defaults);
  }

  validate() {
    return async (formControl) => {
      try {
        await validateEnum(formControl.value, this);
        return null;
      } catch (err) {
        return { validation: err };
      }
    };
  }
}

exports.ENUM_ANGULAR = ENUM_ANGULAR;
exports.EnumFactory = (values, options, defaults) => new ENUM_ANGULAR(values, options, defaults);