'use strict';
let Router = function() {
    this.getInfo = { path: null, f: null };
    this.postInfo = { path: null, f: null };
    this.putInfo = { path: null, f: null };
    this.deleteInfo = { path: null, f: null };
};
// GET
Router.prototype.get = function(path, f) {
    this.getInfo.path = path;
    this.getInfo.f = f;
};
// POST
Router.prototype.post = function(path, f) {
    this.postInfo.path = path;
    this.postInfo.f = f;
};
// PUT
Router.prototype.put = function(path, f) {
    this.putInfo.path = path;
    this.putInfo.f = f;
};
// DELETE
Router.prototype.delete = function(path, f) {
    this.deleteInfo.path = path;
    this.deleteInfo.f = f;
};
Router.prototype.trigger = function(method, req, res) {
    var that = this;
    
    switch(method) {
    case "get":
        that.getInfo.f(req, res);
    break;
    case "post":
        that.postInfo.f(req, res);
    break;
    case "put":
        that.putInfo.f(req, res);
    break;
    case "delete":
        that.deleteInfo.f(req, res);
    break;
}
};

var Express = function() {
    this.router = new Router();
};
Express.prototype.Router = function () {
    return this.router;
};

var express = new Express();
module.exports = express;