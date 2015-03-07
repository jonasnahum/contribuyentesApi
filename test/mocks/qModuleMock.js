"use strict";

let Promise = function (){
    this.thenCallback = null;
    this.failCallback = null;
};
Promise.prototype.then = function (callback){
    this.thenCallback = callback;
};
Promise.prototype.fail = function (callback){
    this.failCallback = callback;
};


let Deferred = function(){
    this.promise = new Promise();
};
Deferred.prototype.resolve = function (array){
    this.promise.thenCallback(array)
};
Deferred.prototype.reject = function (err){
    this.promise.failCallback(err);
};

module.exports = {
    defer: function (){
        return new Deferred();
    }
};

