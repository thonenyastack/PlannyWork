import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { useAppContext } from "../context/appContext";

let now = moment();
let currentDay = now.get("date");
// const { monthlyJobSheet } = useAppContext();
const monthlyJobSheet = [
  {
    _id: {
      year: 2023,
      month: 5,
    },
    count: 15,
  },
  {
    _id: {
      year: 2023,
      month: 6,
    },
    count: 15,
  },
];

let monthlyData = monthlyJobSheet.map((job) => {
  return {
    month: job._id.month,
    count: job.count,
  };
});
const data = [
  { name: "March", Total: 25 },
  { name: "April", Total: 20 },
  { name: "May", Total: 30 },
  { name: "June", Total: 25 },
];

const StatsChart = () => {
  return (
    <div className="statsChart">
      <div className="chartTitle"> Last 4 Months(Workloads)</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;
