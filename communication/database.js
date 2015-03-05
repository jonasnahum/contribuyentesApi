'use strict';

var Request = require("./request.js").init();
var EndPoint = require ("./endPoint.js").init();
var ServerInfo = require ("./serverInfo.js").init();

exports.init = function() {
    var Database = function() {
        this.serverInfo = new ServerInfo(process.env.DB_PROTOCOL,
                                         process.env.DB_DOMAIN,
                                         process.env.DB_PORT);
    };
    
    Database.prototype.getEndPoint = function(method, documents, urlParams, model) {
        var endPoint = new EndPoint({
            uri: documents,
            httpMethod: method,
            headers: { "Content-Type": "application/json"},
            urlParams: urlParams,
            model: model
        });
        
        return endPoint;
    };
    
    Database.prototype.getRequest = function(endPoint){
        var request = new Request({
            endPoint: endPoint,
            serverInfo: this.serverInfo
        });
        return request;
    };
    
    return Database;
};