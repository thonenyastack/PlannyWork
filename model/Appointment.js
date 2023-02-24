import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: [true, "Please provide Job Title"],
      minlength: 5,
      maxlength: 100,
    },
    company: {
      type: String,
      required: [true, "Please provide company name"],
      minlength: 3,
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["planning", "pending", "accepted"],
      default: "planning",
    },
    jobType: {
      type: String,
      enum: ["sale", "marketing", "site-visit", "maintenance"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "my-city",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Meeting", MeetingSchema);
