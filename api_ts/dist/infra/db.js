"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class Database {
    constructor() {
        this.DB_URL = "mongodb://link-db/db_developers";
    }
    // localhost:27017
    createConnection() {
        mongoose.connect(this.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
            console.log(`Banco rodando!`);
        });
    }
}
exports.default = Database;
