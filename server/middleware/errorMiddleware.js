/**
 * The `notFound` function is a middleware that handles requests for routes that are not found,
 * returning a 404 status code and passing an error to the next middleware.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information such as the request method, request URL, request headers, request body, and
 * other relevant data.
 * @param res - The `res` parameter is the response object in Express.js. It is used to send a response
 * back to the client. In this case, it is used to set the status code of the response to 404 (Not
 * Found).
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically used to invoke the next middleware function
 * in the chain. In this case, it is used to pass the error to the next middleware function.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * The errorHandler function is a middleware that handles errors and sends an appropriate response with
 * a status code and error message.
 * @param err - The `err` parameter is the error object that was thrown or passed to the middleware. It
 * contains information about the error, such as the error message and stack trace.
 * @param req - The `req` parameter represents the HTTP request object, which contains information
 * about the incoming request such as the request headers, request method, request URL, request body,
 * etc.
 * @param res - The `res` parameter is the response object in Express.js. It represents the HTTP
 * response that will be sent back to the client.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically used when an error occurs and you want to
 * pass the error to the next error-handling middleware function.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message;

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "product" ? null : err.stack,
  });
};

export { notFound, errorHandler };
