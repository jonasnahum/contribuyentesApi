"use strict";
const ServerInfo =  require("./../communication/serverInfo.js").init();
exports.getUrlTest = function (test){
    test.expect (1);
    //arrange
    
    let domain = "mercadouruapan.com";
    let port = 80;
    let protocol = "http";
    let expected = "http://mercadouruapan.com:80";
    let instance = new ServerInfo(protocol,domain,port);
    //act
    
    let actual = instance.getUrl();
    //assert
    
    test.equal(actual, expected);
    test.done();
};