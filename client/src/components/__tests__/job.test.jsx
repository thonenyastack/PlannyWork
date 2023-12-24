import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Job from "../Job";
import { useContext } from "react";
import { AppProvider, useAppContext } from "../../context/appContext";

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

const TestJobProvider = () => {};

describe("Job", () => {
  it("render all job properties", () => {
    render(<Job key={jobOne._id} {...jobOne} />);
    screen.debug();
  });
});
