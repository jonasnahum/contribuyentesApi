"use strict";

let Validator = require("./validator.js").init();
let validator = new Validator();

exports.init = function (){
    
    let ContribuyenteModel = function (config, isNew) {
          
        this.model = config;
              
        this._addDate(isNew);
        
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
        
        
        this.errors = {};
    };
    
    ContribuyenteModel.prototype.getModel = function() {
        return this.model;  
    };
    
    ContribuyenteModel.prototype._addDate = function(isNew) {
        if (isNew)
            this.model.fechaCreado = Date.now();
            
        this.model.fechaActualizado = Date.now();
    };
    
    ContribuyenteModel.prototype.isValid = function (){
        let counter = 0;
        for(let property in this.errors){
            counter++;
        }
        return counter === 0;
    };
    
    ContribuyenteModel.prototype.validate = function(){
        this.errors = {};
        if (validator.isStringEmpty(this.rfc))
            this._addError("rfc", "El rfc es requerido.");
        if (!validator.regex(this.rfc, /^([a-zA-Z0-9]){3,4}\d{6}([a-zA-Z0-9]){3}$/))
            this._addError("rfc", "El rfc no es válido.");
        if (validator.isStringEmpty(this.nombre))
            this._addError("nombre", "El nombre es requerido.");
        if (validator.isStringEmpty(this.email))
            this._addError("email", "El email es requerido.");
        // if (!validator.regex(this.email, /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/))
        //     this._addError("email", "El email no es válido");
        if (validator.isStringEmpty(this.calle))
            this._addError("calle", "La calle es requerida.");
        if (validator.isStringEmpty(this.numeroExterior))
            this._addError("numeroExterior", "El número exterior es requerido.");    
        if (validator.isStringEmpty(this.colonia))
            this._addError("colonia", "La colonia es requerida.");
        if (!validator.isNumber(this.codigoPostal))
            this._addError("codigoPostal", "El código postal es requerido.");
        if (validator.isStringEmpty(this.localidad))
            this._addError("localidad", "La localidad es requerida.");
        if (validator.isStringEmpty(this.municipio))
            this._addError("municipio", "El municipio es requerido.");
        if (!validator.isInRangeNumber(this.estado, 1, 32))
            this._addError("estado", "El Estado es requerido.");
    };
    
    ContribuyenteModel.prototype._addError = function (field, message){
        if (!this.errors.hasOwnProperty(field)) {
            this.errors[field] = [];
        }
        this.errors[field].push(message);
    };
    
    return ContribuyenteModel;
};
