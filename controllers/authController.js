import User from "../model/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenicatedRequest } from "../errors/index.js";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = new BadRequestError("Please provide all the field");
    next(error);
    // throw new BadRequestError("Please provice all feel...hehe");
  }

  try {
    const user = await User.create({ name, email, password });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      user: {
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        location: user.location,
      },
      token,
    });
  } catch (error) {
    next(error);
  }

  //
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    // throw new BadRequestError("Please provide all the fields");
    const error = new UnAuthenicatedRequest("Plese provide all fields..");
    next(error);
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const error = new UnAuthenicatedRequest("Invalid Login Request..");
      next(error);
    }
    console.log(user);
    const isPasswordCorrect = await user.comparePassword(password);

    if (isPasswordCorrect) {
      const token = user.createJWT();
      user.password = undefined;
      res.status(StatusCodes.OK).json({ user, token, location: user.location });
      // if (!user) {
      //   // throw new UnAuthenicatedRequest("Invalid Credential");
      //   const error = new UnAuthenicatedRequest("Invalid Credential");
    }
  } catch (error) {
    next(error);
  }

  // if (!user) {
  //   // throw new UnAuthenicatedRequest("Invalid Credential");
  //   const error = new UnAuthenicatedRequest("Invalid Credential");
  //   next(error);
  // }

  // console.log(user);
  // const isPasswordCorrect = await user.comparePassword(password);

  // if (isPasswordCorrect) {
  //   const token = user.createJWT();
  //   user.password = undefined;
  //   res.status(StatusCodes.OK).json({ user, token, location: user.location });
  // } else {
  //   const error = new UnAuthenicatedRequest("Invalid Credentials.");
  //   next(error);
  // }

  // if (!isPasswordCorrect) {
  //   // throw new BadRequestError("Invalid Credentialss");
  //   const error = new BadRequestError("Plese provide all fie fie fie..");
  //   next(error);
  // }
  // const token = user.createJWT();
  // user.password = undefined;
  // res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res, next) => {
  const { email, name, lastName, location } = req.body;
  console.log({ UpdateUserEmail: email });
  if (!email || !name || !lastName || !location) {
    const error = new BadRequestError("Please provide all the fields");
    next(error);
  }
  try {
    // findOneAndUpdate would simly do the job..
    const user = await User.findOne({ _id: req.user.userId });
    console.log(user);
    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.location = location;

    await user.save();
    // creating a new token for update user info is optional..
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user, token, location: user.location });
    console.log(req.user);
    res.send("Update user");
  } catch (error) {
    next(error);
  }

  // res.end();
};

export { register, login, updateUser };
