import moment from "moment";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";

const Job = ({
  _id,
  jobSheetNo,
  position,
  jobLocation,
  jobType,
  company,
  createdAt,
  status,
  attachedFileName,
}) => {
  const { setEditJob, deleteJob } = useAppContext();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)} </div>
        <div className="info">
          {/* <h5>{position}</h5> */}
          <h5>{jobSheetNo}</h5>
          <h5>{company}</h5>
          <h5>{date}</h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          {/* class properties for status element is dynamic */}
          <div className={`status ${status}`}> {status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => setEditJob(_id)}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteJob(_id)}
            >
              Delete
            </button>
          </div>
          <div class="attachedFile">
            <span>Attached Jobsheet:</span>
            <a href={`/uploads/${attachedFileName}`} target="_blank">
              {attachedFileName}
              <img src={`/uploads/${attachedFileName}`} />
            </a>
          </div>

          {/* <img
            src={process.env.PUBLIC_URL + "/1685859024019--smallsized1.jpg"}
          /> */}
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
