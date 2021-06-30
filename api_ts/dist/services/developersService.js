"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const developersRepository_1 = require("../repository/developersRepository");
class developersServices {
    get(query, page, perPage) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield developersRepository_1.default
                .find(query)
                .sort({ birthDate: -1 })
                .skip((page - 1) * perPage)
                .limit(perPage);
        });
    }
    getCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield developersRepository_1.default.find({}).countDocuments();
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield developersRepository_1.default.findById({ _id });
        });
    }
    create(developer) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield developersRepository_1.default.create(developer);
        });
    }
    update(_id, developer) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield developersRepository_1.default.findByIdAndUpdate(_id, developer);
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield developersRepository_1.default.findByIdAndRemove({ _id });
        });
    }
}
exports.default = new developersServices();
