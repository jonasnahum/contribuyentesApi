"use strict";

function init(test) {
    let RequestMock = function() {
        
    };
    
    RequestMock.prototype.get = function(config, f) {
        test.equal(config.url, "http://mercadoUruapan.com:80/clientes");
    };
    
    RequestMock.prototype.post = function(config, f) {
        
        test.equal(config.url, "http://mercadoUruapan.com:80/clientes/guardar");
        test.deepEqual(config.form, {
            nombre: "jonas jimenez",
            edad: 29
        });
        test.deepEqual(config.headers, []);
        
        f(new Error("No se encontró el servidor"), null, null);
    };
    
    RequestMock.prototype.put = function(config, f) {
        test.equal(config.url, "http://mercadoUruapan.com:80/clientes/actualizar");
    };
    RequestMock.prototype.del = function(config, f) {
        test.equal(config.url, "http://mercadoUruapan.com:80/clientes/borrar");
        let response = "responseFromServer";
        let body = "bodyFromServer";
        f(null, response, body);
    };
    
    return RequestMock;
}

exports.init = init;