"use strict";

exports.init = function () {

    function EndPoint(config) {
        this.uri = config.uri || "";
        this.urlParams = config.urlParams || null;
        this.routeParams = config.routeParams || null;
        
        this.httpMethod = config.httpMethod || "GET";
        this.model = config.model || null;
        this.headers = config.headers || null;
    }
    
    EndPoint.prototype._isArrayEmpty = function (theArray){
        if (!theArray || theArray.length === 0)
            return true;
        return false;
    };
    
    EndPoint.prototype._readRouteParams = function() {
        var url = this.uri;
        
        if (this._isArrayEmpty(this.routeParams))
            return this.uri;
        
        for (var property in this.routeParams) {
            var regex = new RegExp(":" + property, "g");
            url = url.replace(regex, this.routeParams[property]);
        }
        
        return url;
    };
    
    EndPoint.prototype._readQueryStringParams = function() {
        
        if (this._isArrayEmpty(this.urlParams))
            return "";
        
        var arrParams = [];
        
        for(var property in this.urlParams) {
            arrParams.push(property + "=" + this.urlParams[property]);
        }
        
        return "?" + arrParams.join("&");
    };
    
    EndPoint.prototype.getUrl = function() {
        var url = this._readRouteParams();
        var queryParams = this._readQueryStringParams();
        return url + queryParams;
    };
    
    return EndPoint;
};
