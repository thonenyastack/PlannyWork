import { useAppContext } from "../context/appContext";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import StatsItem from "./StatsItem";
import Wrapper from "../assets/wrappers/StatsContainer";
import FeaturedChart from "./FeaturedChart";
import StatsChart from "./StatsChart";

const StatsContainer = () => {
  const { stats } = useAppContext();
  const defaultStats = [
    {
      title: "Completed JobSheet",
      count: stats.completed || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "Ongoing Jobsheet",
      count: stats.ongoing || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
  ];
  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatsItem key={index} {...item} />;
      })}
      <FeaturedChart />
      <StatsChart />
    </Wrapper>
  );
};

export default StatsContainer;
