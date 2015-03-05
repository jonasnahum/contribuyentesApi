'use strict';
const q = require ("q");
const uuid = require('node-uuid');

exports.init = function() {
    let Request = function(config) {
        this.documents = [];
        this.serverInfo = config.serverInfo || null;
        this.endPoint = config.endPoint || null;
    };
    
    Request.prototype._getHttpMethod = function() {
        let that = this;
        
        let get = function(config, callback) {
            let id = config.url.substr(config.url.lastIndexOf("/") + 1, config.url.length);
            
            for(let i = 0; i < that.documents.length; i++) {
            let doc = that.documents[i];
                if (doc.id === id) {
                    callback(null, {statusCode: 200}, doc);
                    return;
                }
            }
            callback({code: 404});
        };
    
        let post = function(config, callback) {
            try {
                config.json.id = uuid.v4();
                config.json.rev = uuid.v4();
                that.documents.push(config.json);
                callback(null, {statusCode: 200}, config.json);
            } catch(e) {
                callback(e);
            }
        };
    
        let put = function(config, callback) {
            get(config, function(err, res, body){
                if (!err) {
                    //body.name = config.json.name;
                    body.rfc = config.json.rfc,
                    body.nombre = config.json.nombre,
                    body.email = config.json.email,
                    body.calle = config.json.calle,
                    body.numeroExterior = config.json.numeroExterior,
                    body.numeroInterior = config.json.numeroInterior,
                    body.colonia = config.json.colonia,
                    body.codigoPostal = config.json.codigoPostal,
                    body.localidad = config.json.localidad,
                    body.municipio = config.json.municipio,
                    body.estado = config.json.estado,
                    callback(null, {statusCode: 200}, body);
                } else {
                    callback(err);
                }
            });
        };
    
        let del = function(config, callback) {
            let rev = config.url.substr(config.url.lastIndexOf("?") + 5, config.url.length);
            let doc = undefined;
            
            for(let i = 0; i < that.documents.length; i++) {
                if (that.documents[i].rev === rev) {
                    doc = that.documents[i];
                    break;
                }
            }
            
            if (doc) {
                let index = that.documents.indexOf(doc);
                if (index > -1) {
                    that.documents.splice(index, 1);
                    callback(null, {statusCode: 200}, doc);
                    return;
                }
            }
            
            callback({code: 404});
        };
    
        switch (that.endPoint.httpMethod) {
            case 'GET':
                return get;
            case 'POST':
                return post;
            case 'PUT':
                return put;
            case 'DELETE':
                return del;
            default:
                return get;
        }
    };
    
    Request.prototype._getRequestConfig = function() {
        let config = {
            url: this.serverInfo.getUrl() + "/" + this.endPoint.getUrl(),
            json: this.endPoint.model,
            headers: this.endPoint.headers
        };
        return config;
    };
    
    Request.prototype.getPromise = function() {
        let deferred = q.defer();
        let httpMethod = this._getHttpMethod();
        let config = this._getRequestConfig();
        
        let callback = function(err, response, body) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve([response, body]);
            }
        };
        
        httpMethod(config, callback);
        
        return deferred.promise;
    };
    
    return Request;
};