"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const DevelopersSchema_1 = require("../models/DevelopersSchema");
exports.default = mongoose.model("developers", DevelopersSchema_1.default);
