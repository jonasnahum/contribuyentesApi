"use strict";

const express = require ("./mocks/expressModuleMock.js");
const Database = require ("./mocks/dbClassMock.js").init();
let db = new Database();
const Contribuyentes = require ("./../server/routes/contribuyentes.js").init(express, db);

exports.post_success = function(test) {
    test.expect(1);
    let controller = new Contribuyentes();
    let expected = { nombre: "Monse" };
    
    let req = {
        accepts: function(text){
            
        },
        body: expected
    };
    
    let res = {
        status: function(code) {
            return {
                json: function (body) {
                    test.deepEqual(body, expected);
                    test.done();
                }
            };
        }
    };
    
    let next = null;
    
    //trigger
    express.router.postInfo.f(req, res, next);
};

