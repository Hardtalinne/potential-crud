import * as express from "express";
import DevelopersController from "../controller/developersController";

const developersRouter = express.Router();

developersRouter.route("/developers").get(DevelopersController.get);
developersRouter.route("/developers/:id").get(DevelopersController.getById);
developersRouter.route("/count-developers").get(DevelopersController.getCount);
developersRouter.route("/developers").post(DevelopersController.create);
developersRouter.route("/developers/:id").put(DevelopersController.update);
developersRouter.route("/developers/:id").delete(DevelopersController.delete);

export default developersRouter;