"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const db_1 = require("./infra/db");
const developersRouter_1 = require("./router/developersRouter");
class StartUp {
    constructor() {
        this.app = express();
        this._db = new db_1.default();
        this._db.createConnection();
        this.middler();
        this.routes();
    }
    enableCors() {
        const options = {
            methods: "GET, OPTIONS, PUT, POST, DELETE",
            origin: "*",
        };
        this.app.use(cors(options));
    }
    middler() {
        this.enableCors();
        this.app.use(express.json());
        this.app.use(compression());
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send({ versao: "0.0.1" });
        });
        this.app.use("/", developersRouter_1.default);
    }
}
exports.default = new StartUp().app;
