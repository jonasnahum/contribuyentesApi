"use strict";
var express = require ("express"),
      router = express.Router();

router.post("/crear", function(req, res, next) {
    req.accepts("application/json");
} );      

module.exports = router;


