import { UnAuthenicatedRequest } from "../errors/ErrorIndex.js";

const checkAuthorization = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new UnAuthenicatedRequest("Not authorized for request");
};

export default checkAuthorization;
