import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  access_Secrect: process.env.Access_Secrect,
  access_Secrect_Exp_in: process.env.Access_Secrect_Exp_in,
};
