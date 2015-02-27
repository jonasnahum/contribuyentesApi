"use strict";
const DataBase = require ("./../server/models/dataBase.js").init();
const Request = require("./../communication/request.js").init(); 
const EndPoint = require ("./../communication/endPoint.js").init(); 
const ServerInfo = require ("./../communication/serverInfo.js").init();

exports.testDataBase = function (test){
    test.expect(2);
    //arrange
    let endPointExpected = new EndPoint({
        uri:  process.env.DB_NAME + "/" + "crear",
        httpMethod: "POST",
        headers: {accepts: "application/json"},
        urlParams: { id: 120, rfc: 13243515},
        model: {num: 123, nombre: "ABC"}
    });
    let requestExpected = new Request({
        endPoint: endPointExpected,
        serverInfo: new ServerInfo(process.env.DB_PROTOCOL, 
                                         process.env.DB_DOMAIN, 
                                         process.env.DB_PORT)
    });
    
    //act
    let db = new DataBase();
    let actualEndPoint = db.getEndPoint("POST", 
                                        { id: 120, rfc: 13243515}, 
                                        {num: 123, nombre: "ABC"},
                                        "crear");
                                        
    let actualRequest = db.getRequest(endPointExpected);
    
    //assert
    test.deepEqual(actualEndPoint, endPointExpected);
    test.deepEqual(actualRequest, requestExpected);
    
    
    test.done();
    
};