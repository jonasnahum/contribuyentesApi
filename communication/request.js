"use strict";
const request = require("request"),
            q = require("q");

let Request = function(config) {
    if (!config)
        throw new Error("config is missing");
        
    this.serverInfo = config.serverInfo || null;
    this.endPoint = config.endPoint || null;
};

Request.prototype.getHttpMethod = function(){
    switch (this.endPoint.httpMethod) {
        case 'GET':
            return request.get;
        case 'POST':
            return request.post;
        case 'PUT':
            return request.put;
        case 'DELETE':
            return request.del;
        default:
            return request.get;
    }        
};

Request.prototype.getRequestConfig = function() {
    let config = {
        url: this.serverInfo.getUrl() + "/" + this.endPoint.getUrl(),
        form: this.endPoint.model,
        headers: this.endPoint.headers
    };
    
    return config;
};

Request.prototype.getRequest = function () {
    let deferred = q.defer();
    let httpMethod = this.getHttpMethod();
    let config = this.getRequestConfig();
    
    httpMethod(config, function(err, response, body) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve([response, body]);
        }
    });
    
    return deferred.promise;
};