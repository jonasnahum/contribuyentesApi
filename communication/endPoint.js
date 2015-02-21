"use strict";

let EndPoint = (function () {
    function EndPoint(uri, metodoHttp, parametros) {
        this.uri = uri;
        this.metodoHttp = metodoHttp;
        this.parametros = parametros;
    }
    
    EndPoint.prototype.getUrl = function() {
        var url = this.uri;
        
        if (!this.parametros || this.parametros.length == 0)
            return url;
        
        if (this.uri.indexOf(":") == -1) {
            
            var arrParams = [];
            for(var property in this.parametros) {
                arrParams.push(property + "=" + this.parametros[property]);
            }
            
            return url + "?" + arrParams.join("&");
            
        } else {
            
            for (var property in this.parametros) {
                let regex = new RegExp(":" + property, "g");
                url = url.replace(regex, this.parametros[property]);    
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
