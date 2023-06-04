import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CircularProgressbar } from "react-circular-progressbar";
import morevert from "../assets/images/morevert.svg";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";
import { useAppContext } from "../context/appContext";

const FeaturedChart = () => {
  const { monthlyJobSheets, weeklyJobSheets, dailyJobSheets } = useAppContext();
  const text = "80%";
  const currentWeek = moment().week();
  let now = moment();
  let currentDay = now.get("date");
  // const lastWeek = weeklyJobSheets[weeklyJobSheets.length - 1];
  // const last = lastWeek["count"];
  // const last = lastWeek._id;
  // const { count, ...test } = lastWeek;
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
        <p className="featuredAmount">
          {weeklyJobSheets.map((jobsheet, i, arr) => {
            if (arr.length - 1 === i) {
              return <span key={i}> {jobsheet.count} </span>;
            } else {
              return <></>;
            }
          })}
        </p>
      </div>
      <div className="featuredSummary">
        <div className="item">
          <div className="itemTitle">Today</div>
          <div className="itemResult positive">
            <MdOutlineKeyboardArrowUp />
            {/* {dailyJobSheets.length == 0 && <span> 0 </span>} */}
            {dailyJobSheets.map((jobsheet, i, arr) => {
              if (arr.length - 1 === i) {
                return <span key={i}> {jobsheet.count}</span>;
              } else {
                return <></>;
              }
            })}
          </div>
        </div>
        <div className="item">
          <div className="itemTitle">Last Week</div>
          <div className="itemResult positive ">
            <MdOutlineKeyboardArrowUp />
            {/* <span>45</span> */}
            {weeklyJobSheets.map((jobsheet, i, arr) => {
              if (arr.length - 2 === i) {
                return <span key={i}> {jobsheet.count} </span>;
              } else {
                return <></>;
              }
            })}
          </div>
        </div>
        <div className="item">
          <div className="itemTitle">Last Month</div>
          <div className="itemResult positive">
            <MdOutlineKeyboardArrowUp />
            {/* <span>200</span> */}
            {/* {console.log(typeof lastWeek === "undefined")} */}
            {monthlyJobSheets.map((jobsheet, i, arr) => {
              if (arr.length - 1 === i) {
                return <span key={i}> {jobsheet.count} </span>;
              } else {
                return <></>;
              }
            })}
          </div>
          {/* {console.log(typeof weeklyJobSheets[0].count)} */}
          {/* {console.log(Object.keys(weeklyJobSheets))} */}
          {/* {console.log(JSON.parse(JSON.stringify(weeklyJobSheets)))} */}
          {/* {console.log(Object.keys(lastWeek))} */}
          {/* {console.log(currentWeek)}
          {console.log(currentDay)} */}
        </div>
      </div>
    </div>
  );
};

export default FeaturedChart;
