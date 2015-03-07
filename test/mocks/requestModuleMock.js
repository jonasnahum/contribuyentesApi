"use strict";
let Request = function (){
    this.getParams = {config: null, callback: null};
    this.postParams = {config: null, callback: null};
    this.putParams = {config: null, callback: null};
    this.delParams = {config: null, callback: null};
    
};

Request.prototype.get = function(config, callback) {
    this.getParams.config = config;
    this.getParams.callback = callback;
};

Request.prototype.post = function(config, callback) {
    this.postParams.config = config;
    this.postParams.callback = callback;
};

Request.prototype.put = function(config, callback) {
    this.putParams.config = config;
    this.putParams.callback = callback;
};

Request.prototype.del = function(config, callback) {
    this.delParams.config = config;
    this.delParams.callback = callback;
};
module.exports = new Request();
