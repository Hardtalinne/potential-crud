import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import Database from "./infra/db";
import developersRouter from "./router/developersRouter";

class StartUp {
  public app: express.Application;
  private _db: Database;

  constructor() {
    this.app = express();
    this._db = new Database();
    this._db.createConnection();
    this.middler();
    this.routes();
  }

  enableCors() {
    const options: cors.CorsOptions = {
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

    this.app.use("/", developersRouter);
  }
}

export default new StartUp().app;
