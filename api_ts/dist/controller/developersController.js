"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const developersService_1 = require("../services/developersService");
const HttpStatus = require("http-status");
const helper_1 = require("../infra/helper");
class developersController {
    get(req, res) {
        const query = req.query.name ? { name: { $regex: req.query.name } } : {};
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const perPage = req.query.perPage ? parseInt(req.query.perPage) : 8;
        developersService_1.default
            .get(query, page, perPage)
            .then((developers) => helper_1.default.sendResponse(res, HttpStatus.OK, developers))
            .catch((error) => helper_1.default.sendResponse(res, HttpStatus.NOT_FOUND, error));
    }
    getCount(req, res) {
        developersService_1.default
            .getCount()
            .then((developers) => helper_1.default.sendResponse(res, HttpStatus.OK, developers))
            .catch((error) => console.error.bind(console, `Error ${error}`));
    }
    getById(req, res) {
        const _id = req.params.id;
        developersService_1.default
            .getById(_id)
            .then((developers) => helper_1.default.sendResponse(res, HttpStatus.OK, developers))
            .catch((error) => helper_1.default.sendResponse(res, HttpStatus.NOT_FOUND, error));
    }
    create(req, res) {
        let vm = {
            name: req.body.name.toUpperCase(),
            sex: req.body.sex,
            age: Number(req.body.age),
            hobby: req.body.hobby,
            birthDate: req.body.birthDate,
        };
        developersService_1.default
            .create(vm)
            .then((developers) => helper_1.default.sendResponse(res, HttpStatus.CREATED, "Desenvolvedor cadastrada com sucesso!"))
            .catch((error) => helper_1.default.sendResponse(res, HttpStatus.BAD_REQUEST, error));
    }
    update(req, res) {
        const _id = req.params.id;
        let developers = req.body;
        developersService_1.default
            .update(_id, developers)
            .then((developers) => helper_1.default.sendResponse(res, HttpStatus.OK, "Desenvolvedor foi atualiza com sucesso!"))
            .catch((error) => helper_1.default.sendResponse(res, HttpStatus.BAD_REQUEST, error));
    }
    delete(req, res) {
        const _id = req.params.id;
        developersService_1.default
            .delete(_id)
            .then(() => helper_1.default.sendResponse(res, HttpStatus.NO_CONTENT, "Desenvolvedor deletado com sucesso!"))
            .catch((error) => helper_1.default.sendResponse(res, HttpStatus.BAD_REQUEST, error));
    }
}
exports.default = new developersController();
