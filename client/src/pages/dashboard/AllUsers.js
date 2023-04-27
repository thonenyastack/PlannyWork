// import { SearchContainer, JobsContainer } from "../../components";
import UsersListContainer from "../../components/UsersListContainer.js";
import { useAppContext } from "../../context/appContext";

const AllUsers = () => {
  const { user } = useAppContext();
  const role = user.role;
  if (role === "user") {
    return <p> No Team Member to Show</p>;
  }
  return (
    <div>
      {/* <p>Test {JSON.stringify(user)}</p>
      <p>{role}</p> */}
      <UsersListContainer />
      {/* <p>user list</p> */}
    </div>
  );
};

export default AllUsers;
