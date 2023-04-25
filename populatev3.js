import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect.js";
import Job from "./model/Job.js";

const start = async () => {
  try {
    await connectDB(process.env.dbconnectionString);
    await Job.deleteMany();
    let jsonJobs = JSON.parse(
      await readFile(
        new URL("./MOCK_DATA/MOCK_DATA_JOBSHEET_V2.json", import.meta.url)
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
