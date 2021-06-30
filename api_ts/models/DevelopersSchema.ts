import * as mongoose from "mongoose";

const DevelopersSchema = new mongoose.Schema({
  name: { type: String },
  sex: { type: String },
  age: { type: Number },
  birthDate: { type: Date },
  hobby: { type: String },
});

export default DevelopersSchema;
