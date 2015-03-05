"use strict";

exports.init = function (express, db) {
    var Database = require("./../../communication/database.js").init();
    var Model = require("./../models/contribuyenteModel.js").init();
    
    express = express || require('express');
    db = db || new Database();
    
    var ContribuyentesController = function() {
        this.router = express.Router();
        this.register();
    };
    
    ContribuyentesController.prototype.register = function () {
        /* POST crea un nuevo contribuyente. */
        this.router.post('/crear', function(req, res, next) {

            req.accepts('application/json');
            
            let model = new Model({}, req.body);
            model.validate();
            
            if (!model.isValid()){
                res.status(502).json(model.errors);
                return;
            } 
            
    
            let endPoint = db.getEndPoint("POST", "contribuyentes", null, model.addDate(req.body, true));
            let request = db.getRequest(endPoint);
            let promise = request.getPromise();
            
            promise.then(function(args) {
                let couchRes = args[0], body = args[1];
                res.status(couchRes.statusCode).json(body);
            });
            
            promise.fail(function(err, couchRes, body) {
                res.status(502).json({ 
                    error: "bad_gateway", 
                    reason: err.code,
                });
            });
        });
        
        /* PUT actualiza un contribuyente exitente. */
        this.router.put('/actualizar/:id/:rev', function(req, res, next) {
            req.accepts('application/json');
            
            var model = new Model({ id: req.params.id, rev: req.params.rev }, req.body);
            
            model.validate();
            if (!model.isValid()){
                res.status(502).json(model.errors);
                return;
            }
            
            var endPoint = db.getEndPoint("PUT", "contribuyentes/:id", { id: req.params.id }, model.addDate(req.body));
            var request = db.getRequest(endPoint);
            var promise = request.getPromise();
            
            promise.then(function(args) {
                var couchRes = args[0], body = args[1];
                res.status(couchRes.statusCode).json(body);
            });
            
            promise.fail(function(err, couchRes, body) {
                res.status(502).json({ error: "bad_gateway", reason: err.code });
            });
        });
        
        /* GET obtiene un contribuyente por su id. */
        this.router.get('/ver/:id', function(req, res, next) {
            
            var endPoint = db.getEndPoint("GET", "contribuyentes/:id", { id: req.params.id }, null);
            var request = db.getRequest(endPoint);
            var promise = request.getPromise();
            
            promise.then(function(args) {
                var couchRes = args[0], body = args[1];
                res.status(couchRes.statusCode).json(body);
            });
            
            promise.fail(function(err, couchRes, body) {
                res.status(502).json({ error: "bad_gateway", reason: err.code });
            });
        });
        
        /* DELETE borra un contribuyente dado su id y rev. */
        this.router.delete('/borrar/:id/:rev', function(req, res, next) {
            var endPoint = db.getEndPoint("DELETE", "contribuyentes/" + req.params.id, { rev: req.params.rev }, null);
            var request = db.getRequest(endPoint);
            var promise = request.getPromise();
            
            promise.then(function(args) {
                var couchRes = args[0], body = args[1];
                res.status(couchRes.statusCode).json(body);
            });
            
            promise.fail(function(err, couchRes, body) {
                res.status(502).json({ error: "bad_gateway", reason: err.code });
            });
        });
    };
    
    return ContribuyentesController;
};
        
