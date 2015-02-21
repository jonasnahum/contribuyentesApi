"use strict";

let EndPoint = (function () {
    function EndPoint(config) {
        if (!config)
            throw new Error("config is missing.");
        
        this.uri = config.uri || "";
        this.httpMethod = config.httpMethod || "GET";
        this.urlParams = config.urlParams || null;
        this.model = config.model || null;
        this.headers = config.headers || null;
        
    }
    
    EndPoint.prototype.getUrl = function() {
        var url = this.uri;
        
        if (!this.urlParams || this.urlParams.length == 0)
            return url;
        
        if (this.uri.indexOf(":") == -1) {
            
            var arrParams = [];
            for(var property in this.urlParams) {
                arrParams.push(property + "=" + this.urlParams[property]);
            }
            
            return url + "?" + arrParams.join("&");
            
        } else {
            
            for (var property in this.urlParams) {
                let regex = new RegExp(":" + property, "g");
                url = url.replace(regex, this.urlParams[property]);    
            }
            
            return url;
        }
        
    };
    return EndPoint; 
})();


var api = api || {};
var communication = communication || {};

api.communication = communication;
api.communication.EndPoint = EndPoint;

exports.api = api;
