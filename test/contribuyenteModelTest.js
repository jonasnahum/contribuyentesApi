"use strict";

const Contribuyente = require("./../server/models/contribuyenteModel.js").init();

exports.contribuyenteModelTest = function(test) {
    test.expect(16);
    //arrange
    let baseConfig = { 
        rev : "rev",
        id : "id"
    }; 
    let config = {
        
    };
    
    // act
    let model = new Contribuyente(baseConfig, config);
    model.validate();
    
    // assert
    test.equal(model.id, "id");
    test.equal(model.rev, "rev");
    test.equal(typeof model.fechaCreado, "number");
    test.equal(typeof model.fechaActualizado, "number");
    
    test.equal(model.isValid(), false);
    test.deepEqual(model.errors.rfc, ["El rfc es requerido.", "El rfc no es válido."]);
    test.deepEqual(model.errors.nombre, ["El nombre es requerido."]);
    test.deepEqual(model.errors.email, ["El email es requerido."]); //, "El email no es válido"]);
    test.deepEqual(model.errors.calle, ["La calle es requerida."]);
    test.deepEqual(model.errors.numeroExterior, ["El número exterior es requerido."]);
    test.deepEqual(model.errors.colonia, ["La colonia es requerida."]);
    test.deepEqual(model.errors.codigoPostal, ["El código postal es requerido."]);
    test.deepEqual(model.errors.localidad, ["La localidad es requerida."]);
    test.deepEqual(model.errors.municipio, ["El municipio es requerido."]);
    test.deepEqual(model.errors.estado, ["El Estado es requerido."]);
    
    config = {
        rfc: "jklñ132456mkl",
        nombre: "jonasillo",
        email: "jonas@hotmail.com",
        calle: "fco j mujica",
        numeroExterior: "60",
        colonia: "jorhentpiri",
        codigoPostal: 60074,
        localidad: "uruapan",
        municipio: "uruapan",
        estado: 5
    };
    model = new Contribuyente(baseConfig, config);
    test.equal(model.isValid(), true);
    
    
    test.done();
};