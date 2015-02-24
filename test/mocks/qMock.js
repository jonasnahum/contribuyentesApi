"use strict";
let Event = require('events').EventEmitter;

function init () {
    let QMock = function(test) {
        this.test = test;
    };
    
    QMock.prototype.defer = function() {
        let thenEvent = new Event('then');
        let failEvent = new Event('fail');
        let deferred = { 
            promise: {
                then: function(f){
                    thenEvent.on('then', f);
                },
                fail: function(f){
                    failEvent.on('fail', f);
                }
            },
            reject: function(err) {
                failEvent.emit('fail', err);
            },
            resolve: function(array) {
                thenEvent.emit('then', array);
            } 
        };
        return deferred;
    };
    
    return QMock;
}

exports.init = init;