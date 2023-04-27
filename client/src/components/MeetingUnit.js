import moment from "moment";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/MeetingUnit";

const MeetingUnit = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  const { setEditMeeting, deleteMeeting } = useAppContext();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          {/* Todo add Customer Name */}
          <h5>{position}</h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <h5>{company}</h5>
          <div>
            <span className="icon">{<FaLocationArrow />}</span>
            <span className="text">{jobLocation}</span>
          </div>
          <div>
            <span className="icon">{<FaCalendarAlt />}</span>
            <span className="text">{date}</span>
          </div>
          <div>
            <span className="icon">{<FaBriefcase />}</span>
            <span className="text">{jobType}</span>
          </div>
          <div className={`status ${status}`}>{status}</div>
        </div>
      </div>
      <footer>
        <div className="actions">
          <Link
            to="/add-meeting"
            className="btn edit-btn"
            onClick={() => setEditMeeting(_id)}
          >
            Edit
          </Link>
        </div>
      </footer>
    </Wrapper>
  );
};

export default MeetingUnit;
