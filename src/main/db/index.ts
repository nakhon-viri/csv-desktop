import mysql2 from "mysql2";
const connection = mysql2.createConnection({
  host: "kathydb-do-user-15641127-0.c.db.ondigitalocean.com",
  user: "doadmin",
  database: "sale_uat",
  password: "AVNS_GOHw8oogOS85hjqFb1l",
  port: 25060,
});

export const db = (sql, values) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, function (err, results) {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};
