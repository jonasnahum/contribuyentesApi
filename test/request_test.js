"use strict";

let qModule = require ("./mocks/qModuleMock.js");
let requestModule = require ("./mocks/requestModuleMock.js");
const ServerInfo = require("./../communication/serverInfo.js").init();
const EndPoint = require("./../communication/endPoint.js").init();
const Request = require("./../communication/request.js").init(qModule, requestModule);

exports.getPromise_success = function(test){
    test.expect(1);
    
    let endPoint = new EndPoint({
        uri : "contribuyentes",
        httpMethod : "POST",
        model: {nombre: "jonas"},
        headers: {contentType: "application/json"}
    });
    
    let serverInfo = new ServerInfo("http", "contribuyentes.com");
    let request = new Request();
    
    let promise = request.getPromise(serverInfo, endPoint);
    
    
    promise.then (function (actual){
        var expected = ["response", endPoint.model];
        test.deepEqual(actual, expected);
        
        test.done();
    });
    
    
    
    requestModule.postParams.callback(null, "response", endPoint.model);
};