const request = require("supertest");
const app = require("../../dist/startUp");
const developersSchema = require("../../dist/models/developersSchema");

describe("Test My app", () => {

  it("espera-se que o retorno seja status 200 apos cadastrar um desenvolvedor no Banco  ", async () => {
    await developersSchema.create({
      name: "Aline Hardt",
      sex: "F",
      age: 20,
      birthDate: "2000-09-10",
      hobby: "Aprender NodeJS",
    });

    const res = await request(app).get("/developers");
    expect(res.status).toBe(200);
  });
});
