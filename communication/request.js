"use strict";

function init (q, request){
    q = q || require ("q");
    request = request || require ("request");
    
    let Request = function(config) {
        if (!config)
            throw new Error("config is missing");
            
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
        let config = {
            url: this.serverInfo.getUrl() + "/" + this.endPoint.getUrl(),
            form: this.endPoint.model,
            headers: this.endPoint.headers
        };
        
        return config;
    };
    
    Request.prototype.getRequest = function () {
        let deferred = q.defer();
        let httpMethod = this._getHttpMethod();
        let config = this._getRequestConfig();
        
        let callback = function(err, response, body) {
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
} 
exports.init = init; 