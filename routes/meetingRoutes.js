import express from "express";
const router = express.Router();

import {
  createMeeting,
  getAllMeetings,
  deleteMeeting,
  updateMeeting,
  showStats,
} from "../controllers/appointmentController.js";

router.route("/").post(createMeeting).get(getAllMeetings);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteMeeting).patch(updateMeeting);

export default router;
