"use strict";

exports.init = function(q, request, missingConfig) {
    q = q || require ("q");
    request = request || require ("request");
    
    if (!missingConfig) {
        var MissingConfig = require("./../errors/missingConfigError.js").init();
        missingConfig = new MissingConfig();
    }
    
    var Request = function(config) {
        if (!config)
            throw missingConfig;
            
        this.serverInfo = config.serverInfo || null;
        this.endPoint = config.endPoint || null;
    };
    
    Request.prototype._getHttpMethod = function(){
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
    
    Request.prototype._getRequestConfig = function() {
        var config = {
            url: this.serverInfo.getUrl() + "/" + this.endPoint.getUrl(),
            json: this.endPoint.model,
            headers: this.endPoint.headers
        };
        
        return config;
    };
    
    Request.prototype.getPromise = function () {
        var deferred = q.defer();
        var httpMethod = this._getHttpMethod();
        var config = this._getRequestConfig();
        
        var callback = function(err, response, body) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve([response, body]);
            }
        };
        
        httpMethod(config, callback);
        
        return deferred.promise;
    };

    return Request;
};