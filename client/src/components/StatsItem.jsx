import Wrapper from "../assets/wrappers/StatItem";
const StatsItem = ({ count, title, icon, color1, color2, bcg }) => {
  return (
    <Wrapper color1={color1} color2={color2} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};
export default StatsItem;
