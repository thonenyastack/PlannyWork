import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import MeetingUnit from "./MeetingUnit";
import Wrapper from "../assets/wrappers/MeetingContainer";

const MeetingsContainer = () => {
  const {
    getMeetings,
    meetings,
    isLoading,
    totalMeetings,
    search,
    searchStatus,
    searchType,
    sort,
  } = useAppContext();

  useEffect(() => {
    getMeetings();
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  if (meetings.length === 0) {
    return (
      <Wrapper>
        <h3> No Meetings to display..</h3>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalMeetings} meeting{meetings.length > 0 && "s"} found.
      </h5>
      <div className="meetings">
        {meetings.map((meeting) => {
          return <MeetingUnit key={meeting._id} {...meeting} />;
        })}
      </div>
    </Wrapper>
  );
};

export default MeetingsContainer;
