const request = require("supertest");
const { MongoClient } = require("mongodb");
import app from "../../startUp";

describe("Test My app", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(
      "mongodb://localhost/db_developers",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    db = await connection.db("db_developers");
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it("Acesso a Collection do Banco", async () => {
    const users = db.collection("developers");

    const mockUser = { _id: "test", name: "Aline" };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: "test" });
    expect(insertedUser).toEqual(mockUser);
  });

  it("espera-se que o retorno seja status 404 pois não há desenvolvedores cadastrados", async (done) => {
    const res = await request(app).get("/developers");

    expect(res.status).toBe(404);
    done();
  }, 30000);

  it("espera-se que o retorno seja status 200 apos cadastrar um desenvolvedor no Banco  ", async (done) => {
    const payload = {
      name: "aline",
      sex: "F",
      age: 20,
      birthDate: "2000-10-23",
      hobby: "nada nao",
    };

    const res = await request(app)
      .post("/developers")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    done();
  }, 30000);
});
