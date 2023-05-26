import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CircularProgressbar } from "react-circular-progressbar";
import morevert from "../assets/images/morevert.svg";
import "react-circular-progressbar/dist/styles.css";

const FeaturedChart = () => {
  const text = "80%";

  return (
    <div className="featuredChart">
      <div className="featuredHeader">
        <h4>Total Jobsheet </h4>
        <div className="moreVert">
          <img src={morevert} alt="morevert"></img>
        </div>
      </div>
      <div className="content">
        <div style={{ width: 200, height: 200 }}>
          <CircularProgressbar value={80} text={text} strokeWidth={5} />
        </div>
        <div className="featuredTitle">Total Jobsheet This Week</div>
        <p className="featuredAmount"> 20 </p>
      </div>
      <div className="featuredSummary">
        <div className="item">
          <div className="itemTitle">Today</div>
          <div className="itemResult positive">
            <MdOutlineKeyboardArrowUp />
            <span>10</span>
          </div>
        </div>
        <div className="item">
          <div className="itemTitle">Last Week</div>
          <div className="itemResult positive ">
            <MdOutlineKeyboardArrowUp />
            <span>45</span>
          </div>
        </div>
        <div className="item">
          <div className="itemTitle">Last Month</div>
          <div className="itemResult positive">
            <MdOutlineKeyboardArrowUp />
            <span>200</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedChart;
