import * as mongoose from "mongoose";

class Database {
  private DB_URL = "mongodb://link-db/db_developers";
  // localhost:27017
  createConnection() {
    mongoose.connect(
      this.DB_URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log(`Banco rodando!`);
      }
    );
  }
}

export default Database;
