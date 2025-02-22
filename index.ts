import express from "express";
import router from "./src/routes";
import dotenv from "dotenv";
import db from "./db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to database: ", err);
//     return;
//   }
//   console.log("Connected to database successfully");
// });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
