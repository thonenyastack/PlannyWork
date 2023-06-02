import Job from "../model/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/ErrorIndex.js";
import checkAuthorization from "../utils/checkAuthorization.js";
import mongoose from "mongoose";
import moment from "moment";

const createJob = async (req, res, next) => {
  // res.send("Create Job");
  const { jobSheetNo, jobName, company } = req.body;
  const attachedFileName = req.file.filename;
  const attachedFileType = req.file.mimetype;
  console.log(req.file);

  if (!jobSheetNo || !jobName || !company) {
    console.error(`Request Error ${req}`);
    const error = new BadRequestError(
      `Please provide all fields ${attachedFileType} ${attachedFileName}`
    );
    next(error);
    return;
  }

  req.body.createdBy = req.user.userId;
  req.body.attachedFileName = attachedFileName;

  try {
    const job = await Job.create(req.body);
    // console.log(job);
    if (job) {
      res.status(StatusCodes.CREATED).json({ job });
    }
  } catch (error) {
    next(error);
  }
};

const getAllJobs = async (req, res) => {
  const { status, jobType, sort, search, page } = req.query;
  let queryLimit = 10;
  let skipQuery = 0;
  const pageNum = Number(page) || 1;

  // Todo: Add Role to queryObject
  const queryObject = {
    createdBy: req.user.userId,
  };

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.company = { $regex: search, $options: "i" };
    // queryObject.company = { $regex: /ABC/i };
    // queryObject.company = search;
    // Job.find({ company: { $regex: /A/i } });
  }
  // console.log(`query object is ${queryObject}`);
  // console.log(queryObject);
  let result = Job.find(queryObject);

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / queryLimit);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  skipQuery = (pageNum - 1) * 10;

  result = result.skip(skipQuery).limit(queryLimit);
  const jobs = await result;

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
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
    ongoing: stats.ongoing || 0,
    completed: stats.completed || 0,
    // declined: stats.declined || 0,
  };
  let monthlyJobSheets = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    /* Limiting query to get last three months */
    { $limit: 4 },
  ]);
  let weeklyJobSheets = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          week: { $week: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.week": -1 } },
  ]);
  let dailyJobSheets = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { day: { $dayOfMonth: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.day": -1 } },
    { $limit: 2 },
  ]);

  res
    .status(StatusCodes.OK)
    .json({ defaultStats, monthlyJobSheets, weeklyJobSheets, dailyJobSheets });
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

  const { company, jobName } = req.body;

  if (!company || !jobName) {
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
