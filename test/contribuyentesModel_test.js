"use strict";

const Model = require ("./../server/models/contribuyenteModel.js").init();

exports.getModel_test = function(test) {
    test.expect(1);
    let configExpected = {nombre: "jonhy"};
    
    let model = new Model(configExpected);
    
    test.deepEqual(model.getModel(), configExpected);
    test.done();
};

exports.isValid_fail = function(test) {
    test.expect(1);
    
    let expected = false;
    
    let body = {};
    let model = new Model(body);
    model.validate();
    
    test.equal(model.isValid(), expected);
    
    test.done();
};

exports.isValid_success = function(test) {
    test.expect(1);
    
    let expected = true;
    
    let body = {
        rfc : "jige888445kjk",
        nombre : "jonas nahum jimenez garcia",
        email : "jonasnahum@gmail.com",
        calle : "justo sierra",
        numeroExterior : "90",
        numeroInterior : "a",
        colonia : "jorhentpiri",
        codigoPostal : 60670,
        localidad : "ururapan",
        municipio : "ururapan",
        estado : 3 
    };
    
    let model = new Model(body);
    model.validate();
    
    test.equal(model.isValid(), expected);
    
    test.done();
};

exports.errors_property = function(test) {
    test.expect(1);
    
    let expected = {
        rfc: ["El rfc es requerido.", "El rfc no es válido."],
        nombre: ["El nombre es requerido."],
        email: ["El email es requerido."],
        calle: ["La calle es requerida."],
        numeroExterior: ["El número exterior es requerido."],
        colonia: ["La colonia es requerida."],
        codigoPostal: ["El código postal es requerido."],
        localidad: ["La localidad es requerida."],
        municipio: ["El municipio es requerido."],
        estado: ["El Estado es requerido."]
    };
    
    let body = {};
    let model = new Model(body);
    model.validate();
    
    test.deepEqual(model.errors, expected);
    
    test.done();
};

exports.constructor_isNew = function(test) {
    test.expect(2);
    
    let body = {};
    let model = new Model(body, true);
    
    let modelWithDate = model.getModel();

    test.equal(modelWithDate.hasOwnProperty("fechaCreado"), true);
    test.equal(modelWithDate.hasOwnProperty("fechaActualizado"), true);
    
    test.done();
};

exports.constructor_isNotNew = function(test) {
    test.expect(2);
    
    let body = {};
    let model = new Model(body, false);
    
    let modelWithDate = model.getModel();

    test.equal(modelWithDate.hasOwnProperty("fechaCreado"), false);
    test.equal(modelWithDate.hasOwnProperty("fechaActualizado"), true);
    
    test.done();
};