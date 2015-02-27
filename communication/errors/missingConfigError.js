"use strict";
exports.init = function (){
    
    function MissingConfigError (message) {
        this.message = message;
        this.stack = (new Error()).stack;
    }
    
    MissingConfigError.prototype = Object.create(Error.prototype);
    MissingConfigError.prototype.name = "MissingConfigError";

    return MissingConfigError;
};