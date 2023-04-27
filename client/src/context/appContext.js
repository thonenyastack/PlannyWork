import React, { useReducer, useContext } from "react";

import AppReducer from "./reducer";
import axios from "axios";

import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  TOGGLE_SIDEBAR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOB_BEGIN,
  GET_JOB_SUCCESS,
  SET_EDIT_JOB,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  DELETE_JOB_BEGIN,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  RESET_FILTER,
  CREATE_MEETING_BEGIN,
  CREATE_MEETING_SUCCESS,
  CREATE_MEETING_ERROR,
  SET_EDIT_MEETING,
  EDIT_MEETING_BEGIN,
  EDIT_MEETING_SUCCESS,
  EDIT_MEETING_ERROR,
  GET_MEETING_BEGIN,
  GET_MEETING_SUCCESS,
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
} from "./actions";
// import { response } from "express";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const location = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  role: "",
  token: token,
  jobSheetNo: "",
  jobName: "",
  location: location || "Yangon",
  jobLocation: location || "Yangon",
  isEditing: false,
  showSideBar: false,
  editJobId: "",
  position: "",
  company: "",
  jobTypeOptions: ["remote", "on-site", "ad-hoc"],
  // jobType: "full-time",
  statusOptions: ["ongoing", "completed"],
  status: "ongoing",
  startOptions: ["9:00", "9:30"],
  start: "9:00",
  endOptions: ["9:30", "10:00", "10:30"],
  end: "10:00",
  duration: "",
  jobs: [],
  users: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  meetingLocation: location || "Yangon",
  meetings: [],
  totalMeetings: 0,
  weeklyMeetings: [],
  meetingTypesOptions: ["planning", "pending", "accepted", "completed"],
  meetingStatusOption: ["sale", "marketing", "site-visit", "maintenance"],
  meetingCategory: ["on-site", "virtual"],
  editMeetingId: "",
  meetingStatus: "planning",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // axios.defaults.headers["Authorization"] = `Bearer ${state.token}`;

  const authFetch = axios.create({
    baseURL: "/api/v1",
    // headers: {
    //   Authorization: `Bearer ${state.token}`,
    // },
  });

  authFetch.interceptors.request.use(
    (config) => {
      // config.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
      config.headers["Authorization"] = `Bearer ${state.token}`;
      console.log(config);
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        console.log("Auth Error");
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  // Todo: Save user role in local storage
  const saveLocal = ({ token, user, location, role }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("location", location);
    localStorage.setItem("role", role);
  };

  // Todo: Remove user role from local storage
  const removeLocal = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
    localStorage.removeItem("role");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      // console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { token, user, location },
      });
      // Todo: save in local storage later
      saveLocal({ token, user, location });
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    // console.log(currentUser);
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);
      console.log(data);
      const { user, token, location, role } = data;
      console.log(location);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location, role },
      });
      // Todo: save in local storage later
      saveLocal({ token, user, location, role });
      // addUserToLocalStorage({ user, token, location });
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      clearAlert();
    }
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeLocal();
  };

  // Todo: Implement updating state for user in Reducer
  const updateUser = async (currentUser) => {
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getUsers = async (currentUser) => {
    dispatch({ type: GET_USERS_BEGIN });
    try {
      const { data } = await authFetch.get("/auth/listUsers", currentUser);
      const { userRole } = data;
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: {
          userRole,
        },
      });
      console.log(data);
    } catch (error) {
      dispatch({ type: GET_USERS_ERROR });
      console.log(error.response);
    }
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValue = () => {
    dispatch({ type: CLEAR_VALUES });
  };
  const toggleSideBar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const {
        jobSheetNo,
        jobName,
        company,
        jobLocation,
        jobType,
        status,
        start,
        end,
        duration,
      } = state;
      await authFetch.post("/jobs", {
        jobSheetNo,
        jobName,
        company,
        jobLocation,
        jobType,
        status,
        start,
        end,
        duration,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (err) {
      // console.log(error.response.msg);
      if (err.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  const createMeeting = async () => {
    dispatch({ type: CREATE_MEETING_BEGIN });
    try {
      const { position, company, meetingLocation, meetingStatus } = state;
      await authFetch.post("/meetings", {
        position,
        company,
        meetingLocation,
        meetingStatus,
      });
      dispatch({ type: CREATE_MEETING_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (err) {
      if (err.response.status === 401) return;
      dispatch({
        type: CREATE_MEETING_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  const getMeetings = async () => {
    let url = "/meetings";
    dispatch({ type: GET_MEETING_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { meetings, totalMeetings, numOfPages } = data;
      dispatch({
        type: GET_MEETING_SUCCESS,
        payload: {
          meetings,
          totalMeetings,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getJobs = async () => {
    const { search, searchStatus, searchType, sort } = state;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    // Check to Add role and team member id.

    dispatch({ type: GET_JOB_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOB_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      // No error should occur by design, if error, will logout the user
      logoutUser();
    }
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });

      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    console.log("edit job function");
  };

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs();
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
  };

  const resetFilters = () => {
    // console.log("Reset Funtion");
    dispatch({ type: RESET_FILTER });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        registerUser,
        loginUser,
        toggleSideBar,
        logoutUser,
        updateUser,
        handleChange,
        clearValue,
        createJob,
        getJobs,
        setEditJob,
        editJob,
        deleteJob,
        showStats,
        resetFilters,
        createMeeting,
        getMeetings,
        getUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
