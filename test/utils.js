const { AssertionError } = require("assert");
const should = require("should");

exports.shouldThrow = (func, code) => {
  let error;
  try {
    func();
  } catch (err) {
    error = err;
  }
  if (!error) {
    throw new AssertionError({ message: "Did not throw" });
  }
  should.deepEqual(error, code);
};

exports.shouldEventuallyThrow = async (promise, code) => {
  let error;
  try {
    await promise;
  } catch (err) {
    error = err;
  }
  if (!error) {
    throw new AssertionError({ message: "Did not throw" });
  }
  should.deepEqual(error, code);
};
