"use strict";
const Request = require("./../../communication/request.js").init(); 
const EndPoint = require ("./../../communication/endPoint.js").init(); 
const ServerInfo = require ("./../../communication/serverInfo.js").init();
exports.init = function (){
    let DataBase = function () {
        this.serverInfo = new ServerInfo(process.env.DB_PROTOCOL, 
                                         process.env.DB_DOMAIN, 
                                         process.env.DB_PORT);
       
    };
    DataBase.prototype.getEndPoint = function (method, urlParams, model, uri){
        let endPoint = new EndPoint({
            uri: process.env.DB_NAME + "/" + uri,
            httpMethod: method,
            headers: {accepts: "application/json"},
            urlParams: urlParams,
            model: model
        });
        return endPoint;
    };
    DataBase.prototype.getRequest = function (endPoint){
        let request = new Request({
            endPoint: endPoint,
            serverInfo: this.serverInfo
        });
        return request;
    };
    
    return DataBase;
};