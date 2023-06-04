import express from "express";
const router = express.Router();
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
} from "../controllers/jobController.js";

// router.post("/", upload.single("attachedFile"), (req, res, next) => {
//   const { attachedFile } = req.file.filename;
//   res.send("test");
// });

import multer from "multer";
// let upload = multer();
const __dirname = dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../client/public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
  limits: { fileSize: 3000000 },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

router.route("/").post(upload.single("attachedFile"), createJob);
// router.post("/",upload.single("attachedFile"), createJob);
router.get("/", getAllJobs);
// router.route("/").post(createJob).get(getAllJobs);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;
