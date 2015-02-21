"use strict";

const m = require("./../communication/endPoint.js");
exports.getUrlTest = function(test) {
    test.expect(3);
    let expected1 = "contribuyentes/actualizar/1/rev003";
    let expected2 = "contribuyentes/actualizar?id=1&revision=rev003";
    let expected3 = "contribuyentes/actualizar";
    let uri2 = "contribuyentes/actualizar";
    let params = {id: 1, revision: "rev003"};
    let method = "GET";
    let uri1 = "contribuyentes/actualizar/:id/:revision";
    
    let obj1 = new m.api.communication.EndPoint(uri1, method, params);
    let actual1 = obj1.getUrl(); 
    test.equal(actual1, expected1);
    
    let obj2 = new m.api.communication.EndPoint(uri2, method, params);
    let actual2 = obj2.getUrl();
    test.equal(actual2, expected2);
    
    let obj3 = new m.api.communication.EndPoint(uri2, method);
    let actual3 = obj3.getUrl();
    test.equal(actual3, expected3);
    
    test.done();
    
};

