'use strict';

const EndPoint = require("./../communication/endPoint").init();

exports.getUrl_oneParam = function(test) {
    test.expect(1);
    
    let config = {
        uri: "contribuyentes/:id",
        urlParams: { rev: 12345 },
        routeParams: { id: "abcd" }
    };
    
    let expected = "contribuyentes/abcd?rev=12345";
    let ep = new EndPoint(config);
    let actual = ep.getUrl();
    
    test.equal(actual, expected, "getting correct url");
    
    
    test.done();
};

exports.getUrl_multipleParams = function(test) {
    test.expect(1);
    
    let config = {
        uri: "contribuyentes/:id/:name",
        urlParams: { rev: 12345, tax: 18.3 },
        routeParams: { id: "abcd", name: "test" }
    };
    
    let expected = "contribuyentes/abcd/test?rev=12345&tax=18.3";
    let ep = new EndPoint(config);
    let actual = ep.getUrl();
    
    test.equal(actual, expected, "getting correct url");
    
    
    test.done();
};

exports.getUrl_noParams = function(test) {
    test.expect(1);
    
    let config = {
        uri: "contribuyentes",
    };
    
    let expected = "contribuyentes";
    let ep = new EndPoint(config);
    let actual = ep.getUrl();
    
    test.equal(actual, expected, "getting correct url");
    
    
    test.done();
};