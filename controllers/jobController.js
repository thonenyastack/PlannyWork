import Job from "../model/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkAuthorization from "../utils/checkAuthorization.js";
import mongoose from "mongoose";

const createJob = async (req, res) => {
  // res.send("Create Job");
  const { position, company } = req.body;

  if (!position || !company) {
    const error = BadRequestError("Please provide all fields");
    next(error);
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  console.log(job);
  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPage: 1 });
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  // Array Reduce function: acc is callback funcion which does combine and process all the iterated value and return
  // desctructure value from curr _id alias as title, count no change.curr value hold value in the array as iterated.
  // {} to return as JSON.
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  let monthlyApplications = [];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError("No Job Found");
  }
  checkAuthorization(req.user, job.createdBy);
  await job.remove();
  res.status(StatusCodes.OK).json({ msg: "Job Deleted" });
};

const updateJob = async (req, res) => {
  const { id: jobID } = req.params;

  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError("Please Provide all fields");
  }

  const job = await Job.findOne({ _id: jobID });
  if (!job) {
    throw new NotFoundError("No Job Found");
  }

  console.log(typeof req.user.userId);
  console.log(req.user.userId);
  console.log(typeof job.createdBy);
  console.log(job.createdBy);

  checkAuthorization(req.user, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate({ _id: jobID }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedJob });
};

export { createJob, getAllJobs, showStats, deleteJob, updateJob };
