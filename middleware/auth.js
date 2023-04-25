import { UnAuthenicatedRequest } from "../errors/ErrorIndex.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    const error = new UnAuthenicatedRequest("Authenication Failed 1");
    next(error);
  }
  try {
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      // console.log(token);
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(payload);
      req.user = { userId: payload.userId };
      next();
    }
  } catch (error) {
    // console.log(authHeader);
    const token = authHeader.split(" ")[1];
    // console.log(token);
    const jwterror = new UnAuthenicatedRequest("Authenication failed 2");
    next(jwterror);
  }
  // next();
};
export default auth;
