import express from "express";
import mongoose from "mongoose";
import router from "../../views/router";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

async function start() {
  const mongoUrl = process.env.MONGO_DB_URL as string;
  await mongoose.connect(mongoUrl);
  console.log("We are connected to the database! 🥳");
}

start();
export const handler = serverless(app);
