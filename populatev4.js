import { readFile } from "fs/promises";

import dotenv from "dotenv";

import connectDB from "./db/connect.js";
import Job from "./model/Job.js";

dotenv.config();

const url = process.env.dbconnectionString;

const start = async () => {
  console.log(process.env.dbconnectionString);
  try {
    connectDB(url);
    await Job.deleteMany();
    let jsonJobs = JSON.parse(
      await readFile(
        new URL("./MOCK_DATA/MOCK_DATA_JOBSHEET_V3.json", import.meta.url)
      )
    );
    await Job.create(jsonJobs);
    console.log("populated Mock Jobs");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
