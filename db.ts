import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  port: Number(process.env.db_port),
  password: process.env.db_password,
  database: process.env.db_name,
});

export default db;
