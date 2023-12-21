import { FormRow, Alert, FormRowSelect } from "../../components/ComponentIndex";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";

const AddJob = () => {
  const {
    showAlert,
    displayAlert,
    jobSheetNo,
    jobName,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    start,
    startOptions,
    end,
    duration,
    endOptions,
    isEditing,
    editJob,
    handleChange,
    clearValue,
    isLoading,
    createJob,
    handleFile,
    authFetch,
    fileUploadStatus,
    fileUploadError,
    jobDescription,
  } = useAppContext();
  const [files, setFiles] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!jobSheetNo || !jobName || !company) {
      displayAlert();
      return;
    }

    if (isEditing) {
      editJob();
      return;
    }
    const formData = new FormData(document.getElementById("form"));
    authFetch
      .post("/jobs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        fileUploadStatus();
      })
      .catch((error) => {});
  };
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
    // console.log(`${name}: ${value}`);
  };
  const handleFileChange = (e) => {
    // console.log(e.target.files[0]);
    const attachedFile = e.target.files[0];
    setFiles(attachedFile);
    handleFile({ attachedFile });
  };

  return (
    <Wrapper>
      <form className="form" id="form" encType="multipart/form-data">
        <h3>{isEditing ? "edit jobsheet" : "create jobsheet"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* Job Posttion */}
          <FormRow
            type="text"
            name="jobSheetNo"
            value={jobSheetNo}
            handleChange={handleJobInput}
          />

          <FormRow
            type="text"
            name="jobName"
            value={jobName}
            handleChange={handleJobInput}
          ></FormRow>
          {/* Company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          ></FormRow>
          {/* Job Location */}
          <FormRow
            type="text"
            labelText="Address"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          ></FormRow>
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <FormRowSelect
            name="start"
            labelText="start"
            value={start}
            handleChange={handleJobInput}
            list={startOptions}
          />
          <FormRowSelect
            name="end"
            labelText="end"
            value={end}
            handleChange={handleJobInput}
            list={endOptions}
          />
          <FormRow
            type="text"
            name="duration"
            value={duration}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            labelText="Description"
            name="jobDescription"
            value={jobDescription}
            handleChange={handleJobInput}
          />
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValue();
              }}
            >
              clear
            </button>
          </div>
          <input
            type="file"
            name="attachedFile"
            className="attach-btn"
            onChange={handleFileChange}
          />
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
