"use strict";
const m =  require("./../communication/serverInfo.js");
exports.getUrlTest = function (test){
    test.expect (1);
    //arrange
    
    let domain = "mercadouruapan.com";
    let port = 80;
    let protocol = "http";
    let expected = "http://mercadouruapan.com:80";
    let instance = new m.api.communication.ServerInfo(protocol,domain,port);
    //act
    
    let actual = instance.getUrl();
    //assert
    
    test.equal(actual, expected);
    test.done();
};