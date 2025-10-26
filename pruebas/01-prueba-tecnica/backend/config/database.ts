import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sebas940!",
    database: "prueba_fullstack"
});

console.log("Database connected");

export default connection;