import mongoose from "mongoose";
import validator from "validator";

const JobSchema = new mongoose.Schema(
  {
    jobSheetNo: {
      type: String,
      // required: [true, "Please provide Jobsheet Number"],
      validate(value) {
        if (!validator.isNumeric(value) || validator.isEmpty(value)) {
          throw Error("Invalid Entry");
        }
      },
      unique: true,
    },
    jobName: {
      type: String,
      validate(value) {
        if (validator.isNumeric(value) || validator.isEmpty(value)) {
          throw Error("Invalid Job Title");
        }
      },
      // required: [true, "Please provide Jobsheet Name"],
    },
    jobDescripton: {
      type: String,
      minlength: 6,
    },
    actionTaken: {
      type: String,
      minlength: 5,
    },
    company: {
      type: String,

      validate(value) {
        if (!validator.isLength(value, { min: 3, max: 100 })) {
          throw Error("No Short Form,Fill in Complete Company Name");
        }
      },
      // required: [true, "Please provide company name"],
      // minlength: 3,
      // maxlength: 100,
    },

    jobLocation: {
      type: String,
      default: "Yangon",
      required: true,
    },
    jobType: {
      type: String,
      enum: ["on-site", "remote", "ad-hoc"],
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
    attachedFileName: {
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
