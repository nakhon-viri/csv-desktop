// import { drizzle } from "drizzle-orm/mysql2";
// import mysql from "mysql2/promise";
// export const connection = await mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "sale",
//   password: "",
//   port: 3306,
// });
// export const db = drizzle(connection);

// import { drizzle } from "drizzle-orm/planetscale-serverless";
// import { connect } from "@planetscale/database";
// // create the connection
// const connection = connect({
//   // url: "mysql://root:@localhost:3306/sale",
//   host: "localhost:3306",
//   username: "root",
//   password: "",
// });
// export const db = drizzle(connection);

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
  password: "",
  port: 3306,
});
export const db = drizzle(poolConnection);
