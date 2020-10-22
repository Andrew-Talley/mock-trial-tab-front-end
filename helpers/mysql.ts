import mysql from "mysql";

const env = process.env;

export const mySQLPool = mysql.createPool({
  host: env.host,
  port: parseInt(env.port),
  user: env.username,
  password: env.password,
  database: env.database,
  connectionLimit: 3,
});
