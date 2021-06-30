import developersService from "../services/developersService";
import * as HttpStatus from "http-status";

import Helper from "../infra/helper";

class developersController {
  get(req, res) {
    const query = req.query.name ? { name: { $regex: req.query.name } } : {};
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 8;

    developersService
      .get(query, page, perPage)
      .then((developers) => Helper.sendResponse(res, HttpStatus.OK, developers))
      .catch((error) => Helper.sendResponse(res, HttpStatus.NOT_FOUND, error));
  }

  getCount(req, res) {
    developersService
      .getCount()
      .then((developers) => Helper.sendResponse(res, HttpStatus.OK, developers))
      .catch((error) => console.error.bind(console, `Error ${error}`));
  }

  getById(req, res) {
    const _id = req.params.id;
    developersService
      .getById(_id)
      .then((developers) => Helper.sendResponse(res, HttpStatus.OK, developers))
      .catch((error) => Helper.sendResponse(res, HttpStatus.NOT_FOUND, error));
  }

  create(req, res) {
    let vm = {
      name: req.body.name.toUpperCase(),
      sex: req.body.sex,
      age: Number(req.body.age),
      hobby: req.body.hobby,
      birthDate: req.body.birthDate,
    };

    developersService
      .create(vm)
      .then((developers) =>
        Helper.sendResponse(
          res,
          HttpStatus.CREATED,
          "Desenvolvedor cadastrada com sucesso!"
        )
      )
      .catch((error) => Helper.sendResponse(res, HttpStatus.BAD_REQUEST, error));
  }

  update(req, res) {
    const _id = req.params.id;
    let developers = req.body;

    developersService
      .update(_id, developers)
      .then((developers) =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          "Desenvolvedor foi atualiza com sucesso!"
        )
      )
      .catch((error) => Helper.sendResponse(res, HttpStatus.BAD_REQUEST, error));
  }

  delete(req, res) {
    const _id = req.params.id;

    developersService
      .delete(_id)
      .then(() =>
        Helper.sendResponse(
          res,
          HttpStatus.NO_CONTENT,
          "Desenvolvedor deletado com sucesso!"
        )
      )
      .catch((error) => Helper.sendResponse(res, HttpStatus.BAD_REQUEST, error));
  }
}

export default new developersController();
