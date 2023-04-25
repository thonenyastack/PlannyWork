import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./db/connect.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import authenticateUser from "./middleware/auth.js";
import dotenv from "dotenv";
import morgan from "morgan";
import "express-async-errors";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
dotenv.config();

// process.env.NODE_ENV = "production";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  // throw new Error("error");
  res.json({ msg: "API:Home Sweet Home" });
});

app.get("/api/v1", (req, res) => {
  // throw new Error("error");
  res.json({ msg: "WorkPlanner App API Root" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authenticateUser, jobRoutes);
app.use("/api/v1/meetings", authenticateUser, meetingRoutes);
//
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;
const url = process.env.dbconnectionString;
// console.log("test");
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

const start = async () => {
  try {
    await connectDB(url);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      // console.log(`Current Directory: ${__dirname}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

//

// mongoose
//   .connect(
//     "mongodb+srv://yn:ASDFzxcv1234@worktopianodeexpress.jvdbxjf.mongodb.net/Worktopia?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() =>
//     app.listen(port, () =>
//       console.log(`Server up and running on! ${port} ${url}`)
//     )
//   );

// mongoose.set("useFindAndModify", false);

// start();
