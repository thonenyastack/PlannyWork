import moment from "moment";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";

const Job = ({
  _id,
  jobSheetNo,
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
          <h5>#{jobSheetNo}</h5>
          <h5>{company}</h5>
          {/* <h5>{date}</h5> */}
        </div>
      </header>
      <div className="content">
        <div className="content-status">
          <div className="content-center">
            <div>
              <span>{<FaBriefcase />}</span>
              <span>{jobType}</span>
            </div>
            <div>
              <span>{<FaLocationArrow />}</span>
              <span>{jobLocation}</span>
            </div>
            <div>
              <span>{<FaCalendarAlt />}</span>
              <span>{date}</span>
            </div>
            {/* <JobInfo icon={<FaBriefcase />} text={jobType} />
            <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
            <JobInfo icon={<FaCalendarAlt />} text={date} /> */}
          </div>
          {/* class properties for status element is dynamic */}
          <div className={`status ${status}`}> {status}</div>
        </div>
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
        <div class="attachedfile">
          <span>Attachements:</span>
          {attachedFileName && (
            <a href={`/uploads/${attachedFileName}`} target="_blank">
              {attachedFileName}
              <img src={`/uploads/${attachedFileName}`} />
            </a>
          )}
        </div>

        {/* <img
            src={process.env.PUBLIC_URL + "/1685859024019--smallsized1.jpg"}
          /> */}
      </footer>
    </Wrapper>
  );
};

export default Job;
