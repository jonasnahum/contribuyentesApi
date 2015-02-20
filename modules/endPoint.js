"use strict";

function EndPoint(nombre, metodoHttp, parametros) {
    this.nombre = nombre;
    this.metodoHttp = metodoHttp;
    this.parametros = parametros;
}

EndPoint.prototype.getUrl = function() {
    var url = this.nombre;
    
    if (!this.parametros || this.parametros.length == 0)
        return url;
    
    if (this.nombre.indexOf(":") == -1) {
        
        var arrParams = [];
        for(let property in this.parametros) {
            arrParams.push(property + "=" + this.parametros[property]);
        }
        
        return url + "?" + arrParams.join("&");
        
    } else {
        
        for (property in this.parametros) {
            let regex = new RegExp("^:" + property + "$", "g");
            url = url.replace(regex, this.parametros[property]);    
        }
        
        return url;
    }
    
};