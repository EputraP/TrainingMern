import express from "express";
import db from "./store/db/db";
import router from "./routes/router";
import { CountryList } from "./model/CountryList";

const prepare = async () => {
  try {
    await db.authenticate();
    console.log("Database connected");
  } catch (error) {
    console.log("failed to connect to database", error);
  }
  try {
    await CountryList.sync();
    console.log("Sync");
  } catch (e) {
    console.log("Failed to model and db sync", e);
  }
};

const main = async () => {
  const app = express();

  prepare();

  app.use(express.json());
  app.use(router);

  app.listen(8000, () => {
    console.log(`⚡️[server]: running at http://localhost:${8000}`);
  });
};
main();