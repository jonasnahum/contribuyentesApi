"use strict";

const Database = require("./../communication/database.js").init();
const EndPoint = require("./../communication/endPoint.js").init();

exports.save_test = function(test) {
    test.expect(1);
    
    let model = {nombre: "jonas"};
    let endPointExpected = new EndPoint({
            uri: "contribuyentes",
            httpMethod: "POST",
            headers: { "Content-Type": "application/json"},
            urlParams: [],
            routeParams: [],
            model: model
        });
    
    let db = new Database("contribuyentes");
    db.save(model);
    
    test.deepEqual(db.endPoints.save, endPointExpected);
    
    test.done();
};

exports.update_test = function(test) {
    test.expect(1);
    
    let model = {
        nombre: "jonas",
        id: 1,
        rev: 2,
        _id: 1,
        _rev: 2
    };
    
    let endPointExpected = new EndPoint({
            uri: "contribuyentes/:id",
            httpMethod: "PUT",
            headers: { "Content-Type": "application/json"},
            urlParams: [],
            routeParams: {id: 1},
            model: model
        });
    
    let db = new Database("contribuyentes");
    db.update(model, 1, 2);
    
    test.deepEqual(db.endPoints.update, endPointExpected);
    
    test.done();
};

exports.view_test = function(test) {
    test.expect(1);
    
    let endPointExpected = new EndPoint({
            uri: "contribuyentes/:id",
            httpMethod: "GET",
            headers: { "Content-Type": "application/json"},
            urlParams: [],
            routeParams: {id: 1},
            model: null
        });
    
    let db = new Database("contribuyentes");
    db.view(1);
    
    test.deepEqual(db.endPoints.view, endPointExpected);
    
    test.done();
};

exports.del_test = function(test) {
    test.expect(1);
    
    let endPointExpected = new EndPoint({
            uri: "contribuyentes/:id",
            httpMethod: "DELETE",
            headers: { "Content-Type": "application/json"},
            urlParams: {rev: 2},
            routeParams: {id: 1},
            model: null
        });
    
    let db = new Database("contribuyentes");
    db.delete(1, 2);
    
    test.deepEqual(db.endPoints.del, endPointExpected);
    
    test.done();
};