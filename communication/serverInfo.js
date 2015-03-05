"use strict";


exports.init = function () {
    function ServerInfo(protocol, domain, port){
        
        this.protocol = protocol;
        this.domain = domain;
        this.port = port;
        
    }
    
    ServerInfo.prototype.getUrl = function() {
        return this.protocol + "://" + this.domain + ":" + this.port;
    };
    
    return ServerInfo;
};