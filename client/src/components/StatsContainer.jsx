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
      color2: "#fde8cd",
      color1: "#FBD88E",
      bcg: "#F7AF63",
    },
    {
      title: "Ongoing Jobsheet",
      count: stats.ongoing || 0,
      icon: <FaCalendarCheck />,
      color1: "#649BF6",
      color2: "#29559b",
      bcg: "#1e61cc",
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
