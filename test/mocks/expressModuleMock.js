"use strict";
let Router = function() {
    this.postInfo = {
        path: null,
        f: null
    };
    
    this.putInfo = {
        path: null,
        f: null
    };
    
    this.getInfo = {
        path: null,
        f: null
    };
    
    this.deleteInfo = {
        path: null,
        f: null
    };
};

Router.prototype.post = function(path, f) {
    this.postInfo.path = path;
    this.postInfo.f = f;
};

Router.prototype.put = function(path, f) {
    this.putInfo.path = path;
    this.putInfo.f = f;
};


Router.prototype.get = function(path, f) {
    this.getInfo.path = path;
    this.getInfo.f = f;
};

Router.prototype.delete = function(path, f) {
    this.deleteInfo.path = path;
    this.deleteInfo.f = f;
};

let Express = function() {
    this.router = new Router();
};

Express.prototype.Router = function() {
    return this.router;
};


module.exports = new Express();