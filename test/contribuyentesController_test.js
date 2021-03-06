"use strict";

const express = require ("./mocks/expressModuleMock.js");
const Database = require ("./mocks/dbClassMock.js").init();
const PromiseFactoryMock = require ("./mocks/promiseFactoryMock.js").init();
let factory = new PromiseFactoryMock();
let db = new Database();
const Contribuyentes = require ("./../server/routes/contribuyentes.js").init(express, db, factory);
const jce = require("jimenez-couchdb-endpoints");

let controller = new Contribuyentes();
let Req = function(accepts, body) {
    this.accepts = accepts || function(text) { },
    this.body = body;
    this.params = {
        id: 0,
        rev: 0
    };
};
let Res = function(statusCallback, jsonCallback) {
    this.statusCallback = statusCallback;
    this.jsonCallback = jsonCallback;
};
Res.prototype.status = function(code) {
    if (this.statusCallback)
        this.statusCallback(code);
    var that = this;
    return {
        json: function(body){
            if (that.jsonCallback)
                that.jsonCallback(body);//hacer el test.
        }
    };
};

let next = null;

let validModel = {
    rfc : "jige888445kjk",
    nombre : "jonas nahum jimenez garcia",
    email : "jonasnahum@gmail.com",
    calle : "justo sierra",
    numeroExterior : "90",
    numeroInterior : "a",
    colonia : "jorhentpiri",
    codigoPostal : 60670,
    localidad : "ururapan",
    municipio : "ururapan",
    estado : 3 
};
    


exports.post_success = function(test) {
    test.expect(1);
    
    var req = new Req(null, validModel);
    var res = new Res(null, function(body) {
        test.deepEqual(body, validModel);
        test.done();
    });
    
    //trigger
    express.router.postInfo.f(req, res, next);
};

exports.post_fail = function(test) {
    test.expect(1);
    
    db.saveError = { code: 600 };
    let expected = { 
        error: "bad_gateway", 
        reason: 600,
    };
    
    var req = new Req(null, validModel);
    var res = new Res(null, function(err){
        test.deepEqual(err, expected);
        test.done();
    });
    
    //trigger
    express.router.postInfo.f(req, res, next);
};

exports.post_modelNotValid = function(test) {
    test.expect(1);
    let modelEmpty = { };
    
    var req = new Req(null, modelEmpty);
    var res = new Res(function(code){
        test.equal(code, 502);
        test.done();
    }, null);
    
    //trigger
    express.router.postInfo.f(req, res, next);
};

exports.put_success = function (test){
    test.expect (1);
    var req = new Req(null, validModel);
    req.params.id = 1;
    req.params.rev = 2;
    
    db.data[0].rev = 2;
    db.data[0].id = 1;
    
    var res = new Res (null, function (body) {
        test.equal(body, validModel);
        test.done();
    }); 
    
    express.router.putInfo.f(req, res, next);
};

exports.put_fail = function (test){
    test.expect (1);
    
    var expected = { error: "bad_gateway", reason: 404 };
  
    var req = new Req(null, validModel);
    req.params.id = 2;
    req.params.rev = 2;
    
    var res = new Res (null, function (error) {
        test.deepEqual(error, expected);
        test.done();
    }); 
    
    express.router.putInfo.f(req, res, next);
};

exports.put_modelNotValid = function(test) {
    test.expect(1);
    let modelEmpty = { };
    
    var req = new Req(null, modelEmpty);
    var res = new Res(function(code){
        test.equal(code, 502);
        test.done();
    }, null);
    
    //trigger
    express.router.putInfo.f(req, res, next);
};

exports.view_success = function (test) {
    test.expect(1);
    
    var expected = validModel;
    var req = new Req();
    req.params.id = 1;
    
    db.data[0].id = 1;
    
    var res = new Res (null, function (body) {
        test.equal(body, expected);
        test.done();
    }); 
    
    express.router.getInfo.f(req, res, next);
};

exports.view_fail = function (test){
    test.expect (1);
    
    var expected = { error: "bad_gateway", reason: 404 };
  
    var req = new Req();
    req.params.id = 3;
    
    var res = new Res (null, function (error) {
        test.deepEqual(error, expected);
        test.done();
    }); 
    
    express.router.getInfo.f(req, res, next);
};

exports.delete_success = function (test){
    test.expect (1);
    
    var expected = validModel;
    
    var req = new Req();
    req.params.id = 1;
    
    db.data[0].id = 1;
    
    var res = new Res (null, function (body) {
        test.equal(body, expected);
        test.done();
    }); 
    
    express.router.deleteInfo.f(req, res, next);
};

exports.delete_fail = function (test){
    test.expect (1);
    
    var expected = { error: "bad_gateway", reason: 404 };
  
    var req = new Req();
    req.params.id = 3;
    
    var res = new Res (null, function (error) {
        test.deepEqual(error, expected);
        test.done();
    }); 
    
    express.router.deleteInfo.f(req, res, next);
};