"use strict";
let init = function (){
    let ModelBase = function(id, rev, fechaCreado, fechaActualizado){
        this.id = id;
        this.rev = rev;
        this.fechaCreado = fechaCreado || Date.now();
        this.fechaActualizado = fechaActualizado || Date.now();
    };
    return ModelBase;
};
exports.init = init;