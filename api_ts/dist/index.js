"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startUp_1 = require("./startUp");
let port = process.env.PORT || '3001';
startUp_1.default.listen(port, function () {
    console.log("Servidor rodando");
});
