import { UnAuthenicatedRequest } from "../errors/ErrorIndex.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  /* Validate if the Header start with Bearer */
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    const error = new UnAuthenicatedRequest("Authenication Failed");
    // call the next middleware with error argument passed.
    next(error);
  }
  try {
    if (authHeader) {
      /* split the request header and obtain the token at second index position/[1] */
      const token = authHeader.split(" ")[1];
      /* verify if the provided token match the signature  */
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      /*  */
      req.user = { userId: payload.userId };
      next();
    }
  } catch (error) {
    const token = authHeader.split(" ")[1];
    const jwterror = new UnAuthenicatedRequest("Authenication failed");
    next(jwterror);
  }
};
export default auth;
