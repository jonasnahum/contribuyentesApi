"use strict";
/*
        this.uri = config.uri || "";
        this.httpMethod = config.httpMethod || "GET";
        this.params = config.params || null;
        this.sendAsForm = config.sendAsForm || false;
        
*/
const EndPoint = require("./../communication/endPoint.js").init();
exports.getUrlTest = function(test) {
    test.expect(4);
    
    let expected1 = "contribuyentes/actualizar/1/rev003";
    let expected2 = "contribuyentes/actualizar?id=1&revision=rev003";
    let expected3 = "contribuyentes/actualizar";
    let uri1 = "contribuyentes/actualizar/:id/:revision";
    let uri2 = "contribuyentes/actualizar";
    let params = {id: 1, revision: "rev003"};
    let method = "GET";

    
    
    let objConfig1 = { uri: uri1, urlParams: params };
    let obj1 = new EndPoint(objConfig1);
    let actual1 = obj1.getUrl(); 
    test.equal(actual1, expected1);
    
    let objConfig2 = { uri: uri2, urlParams: params };
    let obj2 = new EndPoint(objConfig2);
    let actual2 = obj2.getUrl();
    test.equal(actual2, expected2);
    
    let objConfig3 = { uri: uri2 };
    let obj3 = new EndPoint(objConfig3);
    let actual3 = obj3.getUrl();
    test.equal(actual3, expected3);
    
    test.equal(obj3.httpMethod, method);
    
    test.done();
    
};

