'use strict';
const Database = require("./mocks/databaseClassMock.js").init();
const express = require("./mocks/expressModuleMock");
const Request = require ("./mocks/requestClassMock.js").init();
const ServerInfo = require ("./../communication/serverInfo.js").init();
const q = require ("q");

exports.contribuyentesControllerTest = function (test){
    test.expect(6);
    //arrange
    let request = new Request({ serverInfo: new ServerInfo("https","studio.com", 80) });
    let db = new Database(request);
    let ContribuyentesController = require("./../server/routes/contribuyentes.js").init(express, db);
    let controller = new ContribuyentesController();
    
    let save = function() {
        let def = q.defer();
        let reqPost = {
            body: {
                 rfc: "jjj222222ddd",
                 nombre: "jonas nahum jimenez",
                 email: "x@b.com",
                 calle: "justo sierra",
                 numeroExterior: "60",
                 numeroInterior: "a",
                 colonia: "jorhentipiri",
                 codigoPostal: 22233,
                 localidad: "uruapan",
                 municipio: "uruapan",
                 estado: 3
            },
            accepts: function (text) {
                test.equal(text, "application/json");
            }
        };
        let resPost = {
            status: function(code) {
                return {
                    json: function(obj) {
                        test.deepEqual(obj, request.documents[0]);
                        def.resolve();
                    }
                };
            }
        };
        
        controller.router.trigger("post", reqPost, resPost);
        return def.promise;
    };
    
    let retrieve = function() {
        let def = q.defer();
        
        let reqGet = {
            params: {
                id: request.documents[0].id,
                rev: request.documents[0].rev,
            }
        };
        
        let resGet = {
            status: function(code) {
                return {
                    json: function(obj) {
                        test.deepEqual(obj, request.documents[0]);
                        def.resolve();
                    }
                };
            }
        };
        
        controller.router.trigger("get", reqGet, resGet);
        return def.promise;
    };
    
    let update = function() {
        let def = q.defer();
        let reqPut = {
            params: {
                id: request.documents[0].id
            },
            body: {
                 rfc: "jBj222232DDD",
                 nombre: "Monserrat Jimenez",
                 email: "x@b.com",
                 calle: "justo sierra",
                 numeroExterior: "60",
                 numeroInterior: "b",
                 colonia: "jorhentipiri",
                 codigoPostal: 90090,
                 localidad: "Morelia",
                 municipio: "Morelia",
                 estado: 3
            },
            accepts: function (text) {
                test.equal(text, "application/json");
            }
        };

        let resPut = {
            status: function(code) {
                return {
                    json: function(obj) {
                        delete reqPut.body._id;
                        delete reqPut.body._rev;
                        reqPut.body.id = request.documents[0].id;
                        reqPut.body.rev = request.documents[0].rev;
                        reqPut.body.fechaCreado = request.documents[0].fechaCreado;
                        reqPut.body.fechaActualizado = request.documents[0].fechaActualizado;
                        
                        test.deepEqual(request.documents[0], reqPut.body);
                        def.resolve();
                    }
                };
            }
        };
        
        controller.router.trigger("put", reqPut, resPut);
        return def.promise;
    };
    
    
    let remove = function() {
        let def = q.defer();
        let reqDel = {
            params: {
                id: request.documents[0].id,
                rev: request.documents[0].rev
            }
        };
        
        let resDel = {
            status: function(code) {
                return {
                    json: function(obj) {
                        test.deepEqual(request.documents, []);
                        def.resolve();
                    }
                };
            }
        };
        
        controller.router.trigger("delete", reqDel, resDel);
        
        return def.promise;
    };

    q.fcall(save)
    .then(retrieve)
    .then(update)
    .then(remove)
    .then(function () {
        test.done();
    });    
};