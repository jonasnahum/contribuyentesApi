'use strict';

exports.init = function(Request, EndPoint, ServerInfo) {

    Request =  Request || require("./request.js").init();
    EndPoint = EndPoint || require ("./endPoint.js").init();
    ServerInfo = ServerInfo || require ("./serverInfo.js").init();


    var Database = function(databaseName) {
        
        this.serverInfo = new ServerInfo(process.env.DB_PROTOCOL,
                                         process.env.DB_DOMAIN,
                                         process.env.DB_PORT);
                                         
        this.databaseName = databaseName;
        
        this.endPoints = {
            save: this._getEndPoint({
                method: "POST",
                documents: this.databaseName
            }),
            update: this._getEndPoint({
                method: "PUT",
                documents: this.databaseName + "/:id"
            }),
            del: this._getEndPoint({
                method: "DELETE",
                documents: this.databaseName + "/:id"
            }),
            view: this._getEndPoint({
                method: "GET",
                documents: this.databaseName + "/:id"
            })
        };
    };
    
    Database.prototype._getEndPoint = function(config) {
        
        var method, documents, urlParams, routeParams, model;
        method = config.method || "GET";
        documents = config.documents || "";
        urlParams = config.urlParams || [];
        routeParams = config.routeParams || [];
        model = config.model || null;
        
        var endPoint = new EndPoint({
            uri: documents,
            httpMethod: method,
            headers: { "Content-Type": "application/json"},
            urlParams: urlParams,
            routeParams: routeParams,
            model: model
        });
        
        return endPoint;
    };
    
    Database.prototype._getPromise = function(endPoint) {
        var request = new Request();
        
        return request.getPromise(this.serverInfo, endPoint);
    };
    
    Database.prototype.save = function(model) {
        this.endPoints.save.model = model;
        return this._getPromise(this.endPoints.save);
    };
    
    Database.prototype.update = function(model, id, rev) {
        model.id = id;
        model.rev = rev;
        model._id = model.id;
        model._rev = model.rev;
        
        this.endPoints.update.model = model;
        this.endPoints.update.routeParams = { id: id };
        return this._getPromise(this.endPoints.update);
    };
    
    Database.prototype.view = function(id) {
        this.endPoints.view.routeParams = { id: id };
        return this._getPromise(this.endPoints.view);
    };
    
    Database.prototype.delete = function(id, rev) {
        this.endPoints.del.routeParams = { id: id };
        this.endPoints.del.urlParams = { rev: rev };
        return this._getPromise(this.endPoints.del);
    };
    
    return Database;
};