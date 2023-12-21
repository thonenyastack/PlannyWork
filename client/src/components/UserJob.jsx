import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/UserJob";
const UserJob = () => {
  const location = useLocation();
  const { getUserJobs, userJobs, isLoading } = useAppContext();
  useEffect(() => {
    const { id } = location.state;
    // console.log(id);
    getUserJobs(id);
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  // console.log(userJobs[1].jobName);

  return (
    <Wrapper>
      <h1>User Job Page Test</h1>
      {/* <p>User ID: {id}</p> */}
      <table>
        <thead>
          <tr>
            <th>JobSheet#</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
      </table>
      {userJobs.map((userJob) => {
        return (
          <table>
            <tr>
              <td>{userJob.jobSheetNo}</td>
              <td>{userJob.jobName}</td>
              <td>{userJob.status}</td>
            </tr>
          </table>
        );
      })}
      {/* console.log(userJobs); */}
    </Wrapper>
  );
};

export default UserJob;
