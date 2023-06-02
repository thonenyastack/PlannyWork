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
    // if (e.target.files[0]) {
    //   // const selectedFile = e.target.files[0];
    //   // handleFile({ selectedFile });
    //   setFiles(e.target.files[0]);
    // }
    const formData = new FormData(document.getElementById("form"));
    const data = {
      jobSheetNo: formData.get("jobSheetNo") ?? "test",
      jobName: formData.get("jobName"),
      company: formData.get("company"),
      jobLocation: formData.get("jobLocation"),
      status: formData.get("status"),
      jobType: formData.get("jobType"),
      start: formData.get("start"),
      end: formData.get("end"),
      duration: formData.get("duration"),
    };
    // console.log(data);
    console.log(`file value ${files}`);
    // if (files) {
    //   formData.append("file", files);
    //   formData.append(
    //     "data",
    //     new Blob([JSON.stringify(data)], {
    //       type: "application/json",
    //     })
    //   );
    // }
    authFetch
      .post("/jobs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log("response");
        // console.log(response.statusText);
        // console.log(response.msg);
        fileUploadStatus();
      })
      .catch((error) => {
        // console.log("error");
        // console.log(error.data);
        // fileUploadError(error.message);
      });

    // console.log(files);
    // setFiles(e.target.files[0]);
    // if (e.target.files[0]) {
    //   const selectedFile = e.target.files[0];
    //   handleFile({ selectedFile });
    // }

    // createJob();
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
                // console.log("clear value");
              }}
            >
              clear
            </button>
            {/* <label htmlFor="image">Attach Jobsheet</label> */}
            <input
              type="file"
              name="attachedFile"
              className="attach-btn"
              onChange={handleFileChange}
            />
            {/* <button
              className="btn btn-block attach-btn"
              onClick={handleUpload}
              disabled={isLoading}
            >
              Attach 📎
            </button> */}
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;

// import { FormRow, Alert, FormRowSelect } from "../../components/ComponentIndex";
// import { useAppContext } from "../../context/appContext";
// import Wrapper from "../../assets/wrappers/DashboardFormPage";
// import { useState } from "react";
// import axios from "axios";

// const AddJob = () => {
//   const {
//     showAlert,
//     displayAlert,
//     jobSheetNo,
//     jobName,
//     company,
//     jobLocation,
//     jobType,
//     jobTypeOptions,
//     status,
//     statusOptions,
//     start,
//     startOptions,
//     end,
//     duration,
//     endOptions,
//     isEditing,
//     editJob,
//     handleChange,
//     clearValue,
//     isLoading,
//     createJob,
//     token,
//   } = useAppContext();

//   // const authFetch = axios.create({
//   //   /* Set the Based URL for logged in user */
//   //   baseURL: "/api/v1",
//   // });

//   // /*  */
//   // authFetch.interceptors.request.use(
//   //   (config) => {
//   //     // config.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
//   //     config.headers["Authorization"] = `Bearer ${token}`;
//   //     // console.log(config);
//   //     return config;
//   //   },
//   //   (error) => {
//   //     console.log(error);
//   //     return Promise.reject(error);
//   //   }
//   // );

//   // authFetch.interceptors.response.use(
//   //   (response) => {
//   //     return response;
//   //   },
//   //   (error) => {
//   //     console.log(error.response);
//   //     if (error.response.status === 401) {
//   //       console.log("Auth Error");
//   //     }
//   //     return Promise.reject(error);
//   //   }
//   // );
//   // const [files, setFiles] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // const formData = new FormData(e.target);
//     // const data = {
//     //   jobSheetNo: formData.get("jobSheetNo") ?? "test",
//     //   jobName: formData.get("jobName"),
//     //   company: formData.get("company"),
//     //   jobLocation: formData.get("jobLocation"),
//     //   status: formData.get("status"),
//     //   jobType: formData.get("jobType"),
//     //   start: formData.get("start"),
//     //   end: formData.get("end"),
//     //   duration: formData.get("duration"),
//     // };
//     // setFiles(e.target.files[0]);
//     if (!jobSheetNo || !jobName || !company) {
//       displayAlert();
//       return;
//     }

//     if (isEditing) {
//       editJob();
//       return;
//     }
//     createJob();
//     // formData.append("file", files);
//     // formData.append(
//     //   "data",
//     //   new Blob([JSON.stringify(data)], {
//     //     type: "application/json",
//     //   })
//     // );
//     // const json = JSON.stringify(data);
//     // const blob = new Blob([json], {
//     //   type: "application/json",
//     // });
//     // formData.append("document", blob);
//     // // formData.append('JobSheetNo', data.jobSheetNo);
//     // formData.append("file", files);
//     // authFetch
//     //   .post("/jobs", formData, {
//     //     headers: {
//     //       "Content-Type": "multipart/form-data",
//     //     },
//     //   })
//     //   .then((response) => {
//     //     console.log(response);
//     //   })
//     //   .catch((error) => {
//     //     console.log(error);
//     //   });
//   };

//   // const handleFile = (e) => {
//   //   console.log(e.target.files[0]);
//   // };
//   const handleJobInput = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     handleChange({ name, value });
//     // console.log(`${name}: ${value}`);
//   };
//   return (
//     <Wrapper>
//       <form className="form" encType="multipart/form-data">
//         <h3>{isEditing ? "edit jobsheet" : "create jobsheet"}</h3>
//         {showAlert && <Alert />}
//         <div className="form-center">
//           {/* Job Posttion */}
//           {/* <label htmlFor="jobSheetNo">JobSheetNo</label>
//           <input type="text" name="jobSheetNo" id="jobSheetNo" /> */}
//           <FormRow
//             type="text"
//             name="jobSheetNo"
//             value={jobSheetNo}
//             handleChange={handleJobInput}
//           />
//           <FormRow
//             type="text"
//             name="jobName"
//             value={jobName}
//             handleChange={handleJobInput}
//           ></FormRow>
//           {/* Company */}
//           <FormRow
//             type="text"
//             name="company"
//             value={company}
//             handleChange={handleJobInput}
//           ></FormRow>
//           {/* Job Location */}
//           <FormRow
//             type="text"
//             labelText="Address"
//             name="jobLocation"
//             value={jobLocation}
//             handleChange={handleJobInput}
//           ></FormRow>
//           <FormRowSelect
//             name="status"
//             value={status}
//             handleChange={handleJobInput}
//             list={statusOptions}
//           />
//           <FormRowSelect
//             name="jobType"
//             labelText="job type"
//             value={jobType}
//             handleChange={handleJobInput}
//             list={jobTypeOptions}
//           />
//           <FormRowSelect
//             name="start"
//             labelText="start"
//             value={start}
//             handleChange={handleJobInput}
//             list={startOptions}
//           />
//           <FormRowSelect
//             name="end"
//             labelText="end"
//             value={end}
//             handleChange={handleJobInput}
//             list={endOptions}
//           />
//           <FormRow
//             type="text"
//             name="duration"
//             value={duration}
//             handleChange={handleJobInput}
//           />
//           <div className="btn-container">
//             <button
//               type="submit"
//               className="btn btn-block submit-btn"
//               onSubmit={handleSubmit}
//               disabled={isLoading}
//             >
//               submit
//             </button>
//             <button
//               className="btn btn-block clear-btn"
//               onClick={(e) => {
//                 e.preventDefault();
//                 clearValue();
//                 // console.log("clear value");
//               }}
//             >
//               clear
//             </button>
//           </div>
//           <input type="file" name="attachedFile"></input>
//         </div>
//       </form>
//     </Wrapper>
//   );
// };
// export default AddJob;
