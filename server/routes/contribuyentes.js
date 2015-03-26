"use strict";

exports.init = function (express, db) {
    var Database = require("jimenez-http-communication").Database;
    var Model = require("./../models/contribuyenteModel.js").init();
    
    express = express || require('express');
    db = db || new Database("contribuyentes");
    
    var ContribuyentesController = function() {
        this.router = express.Router();
        this.register();
    };
    
    ContribuyentesController.prototype.register = function () {
        /* POST crea un nuevo contribuyente. */
        this.router.post('/crear', function(req, res, next) {

            req.accepts('application/json');
            
            let model = new Model(req.body, true);
            
            model.validate();
            
            if (!model.isValid()){
                res.status(502).json(model.errors);
                return;
            } 
            
            let promise = db.save(model.getModel());
            
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
            
            var model = new Model(req.body);
            
            model.validate();
            if (!model.isValid()){
                res.status(502).json(model.errors);
                return;
            }
            
            var promise = db.update(model.getModel(), req.params.id, req.params.rev);
            
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
            
            var promise = db.view(req.params.id);
            
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
            
            var promise = db.delete(req.params.id, req.params.rev);
            
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
        
