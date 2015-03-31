exports.init = function(communication){
    'use strict';

    var PromiseFactory = function () {}
    PromiseFactory.prototype.getPromise = function(promise) {

        return promise;;
    }
    return PromiseFactory;
}