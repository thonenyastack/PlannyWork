import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./db/connect.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import authenticateUser from "./middleware/authenticateUser.js";
import dotenv from "dotenv";
import morgan from "morgan";
import "express-async-errors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

mongoose.set("strictQuery", true);

const app = express();
dotenv.config();

// Monolothic Alike Deployment Approach/Style
const __dirname = dirname(fileURLToPath(import.meta.url));
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(path.resolve(__dirname, "./client/src/dist")));
app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "./client/public/uploads"))
);

// process.env.NODE_ENV = "production";
// Mount HTTP request logging middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

app.get("/api/v1", (req, res) => {
  // throw new Error("error");
  res.send({ msg: "WorkPlanner App API Root" });
});

// mount the authRoute, & Pass middleware function for specified request path
app.use("/api/v1/auth", authRoutes);
// mount the jobRoutes, Authenicate the user function middleware for specified requested path
app.use("/api/v1/jobs", authenticateUser, jobRoutes);

// Monolothic Deployment Approach
app.get("*", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  res.sendFile(path.resolve(__dirname, "./client/src/dist", "index.html"));
});

/* If none of the above route match, treat them as not found
mount the generic errorHandler middleware to handle all error: response generalization */
app.use(errorHandlerMiddleware);

// If none of the above route match, treat them as not found
app.use(notFoundMiddleware);

//

const port = process.env.PORT || 5000;
const url = process.env.dbconnectionString;

const start = async () => {
  try {
    connectDB(url);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      // console.log(process.env.NODE_ENV.trim());
      // console.log(`Current Directory: ${__dirname}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
