"use strict";

let ServerInfo = (function () { 

    function ServerInfo(protocol, domain, port){
        this.protocol = protocol;
        this.domain = domain;
        this.port = port;
    }
    
    ServerInfo.prototype.getUrl = function() {
        var url = this.protocol + "://" + this.domain + ":" + this.protocol;
        return url;
    };
    
    return ServerInfo;
    
})();

let api = api || {};
let communication = communication || {};

api.communication = communication;
api.communication.ServerInfo = ServerInfo;

exports.api = api;
