"use strict";
var init = function (){
    var ModelBase = require ("./modelBase.js").init();
    var ContribuyenteModel = function (baseConfig, config) {
        
        this.rfc = config && config["rfc"] ? config["rfc"] : "";
        this.nombre = config && config["nombre"] ? config["nombre"] : "";
        this.email = config && config["email"] ? config["email"] : "";
        this.calle = config && config["calle"] ? config["calle"] : "";
        this.numeroExterior = config && config["numeroExterior"] ? config["numeroExterior"] : "";
        this.numeroInterior = config && config["numeroInterior"] ? config["numeroInterior"] : "";
        this.colonia = config && config["colonia"] ? config["colonia"] : "";
        this.codigoPostal = config && config["codigoPostal"] ? config["codigoPostal"] : "";
        this.localidad = config && config["localidad"] ? config["localidad"] : "";
        this.municipio = config && config["municipio"] ? config["municipio"] : "";
        this.estado = config && config["estado"] ? config["estado"] : "";
        
        let rev = baseConfig && baseConfig["rev"] ? baseConfig["rev"] : "";
        let id = baseConfig && baseConfig["id"] ? baseConfig["id"] : "";
        let fechaCreado = baseConfig && baseConfig["fechaCreado"] ? baseConfig["fechaCreado"] : "";
        let fechaActualizado = baseConfig && baseConfig["fechaActualizado"] ? baseConfig["fechaActualizado"] : "";
        
        ModelBase.call(this, id, rev, fechaCreado, fechaActualizado);
        this.errors = [];
    }
    ContribuyenteModel.prototype = Object.create(ModelBase.prototype);
    ContribuyenteModel.prototype.isValid = function (){
        return this.errors.length === 0;
    };
    ContribuyenteModel.prototype.validate = function(){
        
    };
    
    return ContribuyenteModel;
};
exports.init = init;