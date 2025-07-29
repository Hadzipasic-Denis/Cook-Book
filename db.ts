import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool
  .connect()
  .then((client) => {
    console.log("Successfully connected to the database");
    client.release();
  })
  .catch((err) => console.error("Database connection error:", err.stack));

export default pool;
