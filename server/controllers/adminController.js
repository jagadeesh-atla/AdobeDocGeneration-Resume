import fs from "fs";
import path from "path";
import deleteFiles from "../utils/deleteFiles.js";

const dir = path.join(path.resolve(), "server", "uploads");

/**
 * The greet function sends a JSON response with a message saying "Hello Admin" and a status code of
 * 200.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information such as the request method, headers, query parameters, and request body.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client. It has methods like `status()` to set the status code of the response and `json()` to send a
 * JSON response. In this case, the `status(200)` method is used to
 */
const greet = (req, res) => {
  res.status(200).json({ message: "Hello Admin" });
};

/**
 * The function `deleteAll` deletes all files in a specified directory and returns a success message or
 * an error message.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as the request method, request headers,
 * request body, and request parameters.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or sending an error message.
 */
const deleteAll = (req, res) => {
  try {
    deleteFiles(path.resolve(dir));
    res.status(200).json({ message: "All files Deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * The `deleteSpecific` function deletes a specific file and its corresponding image if they exist, and
 * returns a success message or a not found message.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information such as the request method, request headers, request parameters, request
 * body, etc. In this case, `req.params` is an object that contains the route parameters extracted from
 * the URL. The
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client. It contains methods and properties that allow you to control the response, such as setting
 * the status code, sending JSON data, or redirecting the client to a different URL.
 */
const deleteSpecific = (req, res) => {
  const templateId = req.params.id;
  const file = path.join(dir, "templates", `${templateId}.docx`);
  const image = path.join(
    dir,
    "images",
    `${templateId.replace("template", "image")}.jpeg`
  );

  if (fs.existsSync(file) && fs.existsSync(image)) {
    fs.unlinkSync(file);
    fs.unlinkSync(image);
    res.status(200).json({ Message: "file deleted." });
  } else {
    res.status(404).json({ message: "No file found!" });
  }
};

export { greet, deleteAll, deleteSpecific };
