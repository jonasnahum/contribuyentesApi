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
    };
    
    return ContribuyentesController;
};
        
