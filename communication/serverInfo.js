"use strict";


function init () { 

    function ServerInfo(protocol, domain, port){
        this.protocol = protocol;
        this.domain = domain;
        this.port = port;
    }
    
    ServerInfo.prototype.getUrl = function() {
        var url = this.protocol + "://" + this.domain + ":" + this.port;
        return url;
    };
    
    return ServerInfo;
    
}

exports.init = init;
