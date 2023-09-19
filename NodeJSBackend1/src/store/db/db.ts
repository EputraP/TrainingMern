import { Dialect, Options, Sequelize } from "sequelize";
import dotenv from "dotenv";
import pg from "pg";
// dotenv.config({ path: "./src/.env" }); // if .env file not in root
dotenv.config();
let DB_Port: any = process.env.DB_PORT ?? 0;
let DB_Host: string = process.env.DB_HOST ?? "localhost";
let DB_Name: string = process.env.DB_NAME ?? "postgres";
let DB_User: string = process.env.DB_USER ?? "postgres";
let DB_Pass: string = process.env.DB_PASS ?? "postgres";

const sequelize = new Sequelize(DB_Name, DB_User, DB_Pass, {
  host: DB_Host,
  port: DB_Port,
  dialectModule: pg,
  dialect: "postgres",
});

export default sequelize;
