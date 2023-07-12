import jwt from "jsonwebtoken";

/**
 * The function generates a token using the user information and a secret key, and then sends the token
 * as a JSON response.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is typically provided by the web framework or library being used (e.g., Express.js).
 * @param user - The `user` parameter is an object that contains the user information that will be used
 * to generate the token.
 */
const generateToken = (res, user) => {
  const token = jwt.sign(user, process.env.KEY);
  res.json({ token });
};

export default generateToken;
