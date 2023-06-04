import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdSupervisorAccount } from "react-icons/md";

const links = [
  { id: 1, text: "overview", path: "/", icon: <IoBarChartSharp /> },
  {
    id: 2,
    text: "view all jobsheets",
    path: "all-jobs",
    icon: <MdQueryStats />,
  },
  { id: 3, text: "Create Jobsheet", path: "add-job", icon: <FaWpforms /> },

  { id: 4, text: "profile", path: "profile", icon: <ImProfile /> },
  { id: 7, text: "Teams", path: "all-users", icon: <MdSupervisorAccount /> },
  // { id: 8, text: "User Jobs", path: "user-job" },
];

export default links;
