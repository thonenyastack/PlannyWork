import Meeting from "../model/Appointment.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/ErrorIndex.js";
import checkAuthorization from "../utils/checkAuthorization.js";
import mongoose from "mongoose";

const createMeeting = async (req, res) => {
  // res.send("Create Job");
  const { name, position, company } = req.body;

  if (!name || !position || !company) {
    const error = BadRequestError("Please provide all fields");
    next(error);
  }

  req.body.createdBy = req.user.userId;

  const meeting = await Meeting.create(req.body);
  console.log(meeting);
  res.status(StatusCodes.CREATED).json({ meeting });
};

const getAllMeetings = async (req, res) => {
  const meetings = await Meeting.find({ createdBy: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ meetings, totalMeetings: meetings.length, numOfPage: 1 });
};

const showStats = async (req, res) => {
  let stats = await Meeting.aggregate([
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
    pending: stats.planning || 0,
    interview: stats.pending || 0,
    declined: stats.accepted || 0,
  };
  let monthlyApplications = [];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

const deleteMeeting = async (req, res) => {
  const { id: meetingID } = req.params;
  const meeting = await Meeting.findOne({ _id: meetingID });

  if (!meeting) {
    throw new NotFoundError("No Job Found");
  }
  checkAuthorization(req.user, meeting.createdBy);
  await meeting.remove();
  res.status(StatusCodes.OK).json({ msg: "Meeting Deleted" });
};

const updateMeeting = async (req, res) => {
  const { id: meetingID } = req.params;

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

  const updatedMeeting = await Meeting.findOneAndUpdate(
    { _id: meetingID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedMeeting });
};

export {
  createMeeting,
  getAllMeetings,
  showStats,
  deleteMeeting,
  updateMeeting,
};
