import * as mongoose from "mongoose";
import DevelopersSchema from "../models/DevelopersSchema";

export default mongoose.model("developers", DevelopersSchema);
