import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect.js";
import Meeting from "./model/Appointment.js";

const start = async () => {
  try {
    await connectDB(process.env.dbconnectionString);
    await Meeting.deleteMany();
    const jsonProducts = JSON.parse(
      await readFile(new URL("./MOCK_DATA_V2.json", import.meta.url))
    );
    await Meeting.create(jsonProducts);
    console.log("Populated Mock Data");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
