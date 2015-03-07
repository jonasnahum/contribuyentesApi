"use strict";

exports.init = function(q, request) {
    q = q || require ("q");
    request = request || require ("request");
    
    var Request = function() {
    
    };
    
    Request.prototype._getHttpMethod = function(httpMethod) {
        switch (httpMethod) {
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
    
    Request.prototype._getRequestConfig = function(serverInfo, endPoint) {
        var config = {
            url: serverInfo.getUrl() + "/" + endPoint.getUrl(),
            json: endPoint.model,
            headers: endPoint.headers
        };
        
        return config;
    };
    
    Request.prototype.getPromise = function (serverInfo, endPoint) {
        var deferred = q.defer();
        var httpMethod = this._getHttpMethod(endPoint.httpMethod);
        var config = this._getRequestConfig(serverInfo, endPoint);
        
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