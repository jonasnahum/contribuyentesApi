"use strict";


exports.init = function () {
    function ServerInfo(protocol, domain, port){
        
        this.protocol = protocol || "";
        this.domain = domain || "";
        this.port = port || "";
        
    }
    
    ServerInfo.prototype.getUrl = function() {
        var url = this.protocol + "://" + this.domain;
        
        if (this.port) {
            url = url + ":" + this.port;
        }
        
        return url;
    };
    
    return ServerInfo;
};