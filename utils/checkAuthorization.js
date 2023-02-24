import { UnAuthenicatedRequest } from "../errors/index.js";

const checkAuthorization = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new UnAuthenicatedRequest("Not authorized for request");
};

export default checkAuthorization;
