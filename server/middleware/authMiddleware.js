import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

/* The code block is defining a middleware function called `protect`. This function is used to protect
routes by checking if the request contains a valid token in the `Authorization` header. */
const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.KEY);
      req.user = decode;
      if (decode.username === process.env.ADMIN) {
        next();
      } else {
        res.status(401);
        throw new Error("Not authorized");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export default protect;
