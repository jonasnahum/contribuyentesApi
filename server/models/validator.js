"use strict";
exports.init = function (){
    let Validator = function(){
        
    };
    Validator.prototype.isStringEmpty = function (text){
        if (this.isNull(text))
            return true;
            
        if (typeof text === "string" && text.length > 0)
            return false;
            
        return true;
    };
    Validator.prototype.isNull = function (value){
        if (value === null || value === undefined)
            return true;
        return false;
    };
    Validator.prototype.isNumber = function (number){
        if (this.isNull(number))
            return false;
        if (typeof number === "number")
            return true;
        return false;
    };
    Validator.prototype.isInRangeNumber = function (number, start, end){
        if (!this.isNumber(number))
            return false;
        if (number >= start && number <= end)
            return true;
        return false;
    }
    Validator.prototype.regex = function (value, regex){
        return regex.test(value);
    };
    
    
    return Validator;
};