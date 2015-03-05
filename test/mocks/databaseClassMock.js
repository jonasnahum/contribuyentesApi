'use strict';
const EndPoint = require ("./../../communication/endPoint.js").init();

exports.init = function() {
    var Database = function(request) {
        this.request = request;
    };
    
    Database.prototype.getEndPoint = function(method, documents, urlParams, model) {
        let endPoint = new EndPoint({
            uri: documents,
            httpMethod: method,
            headers: { "Content-Type": "application/json"},
            urlParams: urlParams,
            model: model
        });
        
        return endPoint;
    };
    
    Database.prototype.getRequest = function(endPoint){
        this.request.endPoint = endPoint;
        return this.request;
    };
    
    return Database;
};