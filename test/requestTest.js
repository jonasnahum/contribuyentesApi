"use strict";

exports.requestTest =  function (test) {
    test.expect (10);
    
    let EndPoint = require ("./../communication/endPoint.js").init();
    let ServerInfo = require ("./../communication/serverInfo.js").init();
    let QMock = require ("./mocks/qMock.js").init();
    
    /*
        let q = new QMock(test);
    */
    
    let RequestMock = require ("./mocks/requestMock.js").init(test);
    let request = new RequestMock();
    let Request = require ("./../communication/request.js").init(null, request);


    
    //arrange.
    let serverInfo = new ServerInfo("http", "mercadoUruapan.com", 80);
    let endPointPost =  new EndPoint({
        uri: "clientes/guardar",
        httpMethod: "POST",
        urlParams: [],
        model: {
            nombre: "jonas jimenez",
            edad: 29
        },
        headers: []
    });
    let endPointGet = new EndPoint({
        uri: "clientes",
        httpMethod: "GET"
    });
    let endPointNada = new EndPoint({
        uri: "clientes",
        httpMethod: ""
    });
    let endPointPut = new EndPoint({
        uri: "clientes/actualizar",
        httpMethod: "PUT"
    });
    let endPointDelete = new EndPoint({
        uri: "clientes/borrar",
        httpMethod: "DELETE"
    });
    
    // assert
    let instance = new Request({ serverInfo: serverInfo, endPoint: endPointPost });
    let promise1 = instance.getRequest();
    
    let instance2 = new Request({ serverInfo: serverInfo, endPoint: endPointGet });
    instance2.getRequest();
    
    let instance3 = new Request({ serverInfo: serverInfo, endPoint: endPointNada });
    instance3.getRequest();
    
    let instance4 = new Request({ serverInfo: serverInfo, endPoint: endPointPut });
    instance4.getRequest();
    
    let instance5 = new Request({ serverInfo: serverInfo, endPoint: endPointDelete });
    let promise2 = instance5.getRequest();
    
    promise1.fail(function(err) {
        let expected = new Error("No se encontró el servidor");
        test.deepEqual(err, expected);
    });
    
    promise2.then(function(array) {
        let response = "responseFromServer";
        let body = "bodyFromServer";
        
        test.equal(array[0], response);
        test.equal(array[1], body);
        
        test.done();
    });
    
};