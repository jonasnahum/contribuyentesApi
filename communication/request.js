"use strict";

let Request = function(config) {
    if (!config)
        throw Error("config is missing");
        
    this.serverInfo = config.serverInfo || null;
    this.endPoint = config.endPoint || null;
    this.modelo = config.modelo || null;
    this.headers = config.headers || null;
};

Request.prototype.getRequest = function () {
    
}