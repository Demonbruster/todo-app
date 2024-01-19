"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//------------- middleware 
// body parser for json
express_1.default.json();
var app = (0, express_1.default)();
app.listen(5000, function () {
    console.log('Server is running on port 3001');
});
