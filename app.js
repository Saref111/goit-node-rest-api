import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRouter from "./routes/usersRouter.js";
import './config/config-passport.js';

dotenv.config();

const uri = process.env.DB_HOST;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
