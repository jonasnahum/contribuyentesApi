"use strict";

const q = require ("q");

exports.init = function () {
    let Database = function() {
        this.data = [];
    };
    
    Database.prototype._getIndexBy = function(property, value) {
        for (var i = 0; i < this.data.length; i++){
            if (this.data[i][property] === value){
                return i;
            }
        }
        
        return null;
    };
    
    Database.prototype.save = function(model) {
        var deferred = q.defer();
        
        try {
            this.data.push(model);
            deferred.resolve([{statusCode: 200}, model]);
        } catch(err) {
            deferred.reject(err);
        }
        
        return deferred.promise;
    };
    
    Database.prototype.update = function(model, id, rev) {
        var deferred = q.defer();
        
        var index = this._getIndexBy("id", id);
        if (index) {
            this.data[index] = model;
            deferred.resolve([{statusCode: 200}, model]);
        }else{
            deferred.reject({statusCode: 404});
        }
        
        return deferred.promise;
    };
    
    Database.prototype.view = function(id) {
        var deferred = q.defer();
        
        var index = this._getIndexBy("id", id);
        if (index) {
            var model = this.data[index];
            deferred.resolve([{statusCode: 200}, model]);
        }else{
            deferred.reject({statusCode: 404});
        }
        
        return deferred.promise;
    };
    
    Database.prototype.delete = function(id) {
        var deferred = q.defer();
        
        var index = this._getIndexBy("id", id);
        if (index) {
            var model = this.data[index];
            this.data.splice(index, 1);
            deferred.resolve([{statusCode: 200}, model]);
        }else{
            deferred.reject({statusCode: 404});
        }
        
        return deferred.promise;
    };
    
    return Database;
};