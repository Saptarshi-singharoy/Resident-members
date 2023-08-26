import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/conn.js";
import authRouter from "./router/auth.js";

const app = express();

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;

connectDB();

const middleware = (req, res, next) => {
  console.log(`middleware passed`);
  next();
};

app.use(express.json())

app.use(authRouter);

app.get("/", (req, res) => {
  res.send("welcome to home page");
});

app.get("/about", middleware, (req, res) => {c
  res.send(`welcome to about page`);
});

app.listen(PORT, () => {
  console.log(`server started on port 3000`);
});
