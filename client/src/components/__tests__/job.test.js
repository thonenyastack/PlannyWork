import React from "react";
import { ReactDOM, render } from "react-dom";
import Job from "../../components/Job.js";

const jobOne = {
  _id: "642580b94e1bc8a2164ce0d3",
  company: "Gurwitch Products",
  email: "klefleming0@blogtalkradio.com",
  jobLocation: "470 Stone Corner Crossing",
  jobType: "ad-hoc",
  status: "completed",
  start: "9:00",
  end: "10:00",
  duration: "1",
  createdBy: "639871d7f44b31b781977b58",
  createdAt: "2022-12-25T15:20:11.000Z",
  updatedAt: "2022-12-25T15:20:11.000Z",
  __v: 0,
};

const jobTwo = {
  _id: "642580b94e1bc8a2164ce0d7",
  company: "NARS Cosmetics",
  email: "wgilbart4@xing.com",
  jobLocation: "6628 Summit Crossing",
  jobType: "on-site",
  status: "completed",
  start: "13:00",
  end: "14:00",
  duration: "1",
  createdBy: "639871d7f44b31b781977b58",
  createdAt: "2022-12-06T20:29:53.000Z",
  updatedAt: "2022-12-06T20:29:53.000Z",
  __v: 0,
};

const jobs = [jobOne, jobTwo];

describe("Job", () => {
  test("render all job properties", () => {
    render(<Job key={jobOne._id} {...jobOne} />);
  });
});
