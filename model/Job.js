import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    jobSheetNo: {
      type: String,
      required: [true, "Please provide Jobsheet Number"],
    },
    jobName: {
      type: String,
      required: [true, "Please provide Jobsheet Title"],
    },
    jobDescripton: {
      type: String,
      minlength: 5,
    },
    actionTaken: {
      type: String,
      minlength: 5,
    },
    company: {
      type: String,
      required: [true, "Please provide company name"],
      minlength: 3,
      maxlength: 100,
    },
    email: {
      type: String,
    },
    jobLocation: {
      type: String,
      default: "Yangon",
      required: true,
    },
    jobType: {
      type: String,
      enum: ["on-site", "remote", "ad-hoc", "maintenance"],
      default: "on-site",
    },
    status: {
      type: String,
      enum: ["completed", "ongoing"],
      default: "completed",
    },
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    duration: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
