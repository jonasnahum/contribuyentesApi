"use strict";
const express = require ("express"),
      router = express.Router(),
      DataBase = require ("./../models/dataBase.js").init(),
      ContribuyenteModel = require ("./../models/contribuyenteModel.js").init();

      
let db = new DataBase();

router.post('/crear', function(req, res, next){
    
    req.accepts('application/json');
    let validator = new ContribuyenteModel({}, req.body);
    validator.validate();
    
    if (!validator.isValid()){
        res.status(502).json(validator.errors);
    } else {
        
        let endPoint = db.getEndPoint("POST", null, req.body, "crear");
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
                err: err,
                couchRes: couchRes,
                body: body

            });
        });
    }
});

module.exports = router;


