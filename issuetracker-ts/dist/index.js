"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
app_1.app.listen(process.env.PORT || 3000, function () {
    console.log('Server started.');
});
