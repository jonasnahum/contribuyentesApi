"use strict";

const Validator = require("./../server/models/validator.js").init();

exports.validatorTest = function(test) {
    test.expect(11);
    
    let validator = new Validator();
    
    // isNull
    test.equal(validator.isNull(undefined), true);
    test.equal(validator.isNull(null), true);
    test.equal(validator.isNull("hola"), false);
    
    // isStringEmpty
    test.equal(validator.isStringEmpty(""), true);
    test.equal(validator.isStringEmpty("not empty"), false);
    
    //isNumber
    test.equal(validator.isNumber(12), true);
    test.equal(validator.isNumber("asd"), false);
    
    //isInRangeNumber
    test.equal(validator.isInRangeNumber(2, 1, 32), true);
    test.equal(validator.isInRangeNumber(33, 1, 32), false);
    
    //regex
    test.equal(validator.regex("12", /\d{2}/), true);
    test.equal(validator.regex("ab", /\d{2}/), false);
    
    test.done();
};
