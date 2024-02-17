import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
const poolConnection = mysql.createPool({
  // host: "kathydb-do-user-15641127-0.c.db.ondigitalocean.com",
  // user: "doadmin",
  // database: "Sale",
  // password: "AVNS_GOHw8oogOS85hjqFb1l",
  // port: 25060,
  host: "localhost",
  user: "root",
  database: "sale",
  password: "1234",
  port: 3306,
});
export const db = drizzle(poolConnection);
