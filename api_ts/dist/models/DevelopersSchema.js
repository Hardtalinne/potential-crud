"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const DevelopersSchema = new mongoose.Schema({
    name: { type: String },
    sex: { type: String },
    age: { type: Number },
    birthDate: { type: Date },
    hobby: { type: String },
});
exports.default = DevelopersSchema;
