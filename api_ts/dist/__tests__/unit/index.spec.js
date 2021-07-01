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
const request = require("supertest");
const { MongoClient } = require("mongodb");
const startUp_1 = require("../../startUp");
describe("Test My app", () => {
    let connection;
    let db;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        connection = yield MongoClient.connect("mongodb://localhost/db_developers", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = yield connection.db("db_developers");
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.close();
        yield db.close();
    }));
    it("Acesso a Collection do Banco", () => __awaiter(void 0, void 0, void 0, function* () {
        const users = db.collection("developers");
        const mockUser = { _id: "123", name: "Aline" };
        yield users.insertOne(mockUser);
        const insertedUser = yield users.findOne({ _id: "123" });
        expect(insertedUser).toEqual(mockUser);
    }));
    it("espera-se que o retorno seja status 404 pois não há desenvolvedores cadastrados", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(startUp_1.default).get("/developers");
        expect(res.status).toBe(404);
        done();
    }), 30000);
    it("espera-se que o retorno seja status 200 apos cadastrar um desenvolvedor no Banco  ", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            name: "aline",
            sex: "F",
            age: 20,
            birthDate: "2000-10-23",
            hobby: "nada nao",
        };
        const res = yield request(startUp_1.default)
            .post("/developers")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        expect(res.status).toBe(200);
        done();
    }), 30000);
});
