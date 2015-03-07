'use strict';

const ServerInfo = require("./../communication/serverInfo").init();

exports.getUrl_allParams = function(test) {
    test.expect(1);
    var expected = "https://localhost:5984";
    
    var serverInfo = new ServerInfo("https", "localhost", 5984);
    var actual = serverInfo.getUrl(); 
    
    test.equal(actual, expected, "getting correct url");
    test.done();
};

exports.getUrl_noPort = function(test) {
    test.expect(1);
    var expected = "http://contribuyentes.com";
    
    var serverInfo = new ServerInfo("http", "contribuyentes.com");
    var actual = serverInfo.getUrl(); 
    
    test.equal(actual, expected, "getting correct url without port");
    test.done();
};