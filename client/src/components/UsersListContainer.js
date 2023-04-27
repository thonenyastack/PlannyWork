// Todo implement getUsers func in AppContext
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/UserListContainerWrapper";
import UserInfo from "./UserInfo";

const UsersListContainer = () => {
  const { getUsers, users, isLoading } = useAppContext();

  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (users.length === 0) {
    return <div>No Team Members to display</div>;
  }

  return (
    <Wrapper>
      <div className="users">
        {users.map((user) => (
          <UserInfo key={user._id} {...user} />
        ))}
      </div>
    </Wrapper>
  );
};

export default UsersListContainer;
