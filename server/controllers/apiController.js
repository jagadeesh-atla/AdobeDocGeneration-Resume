import asyncHandler from "express-async-handler";
import fs from "fs";
import path from "path";
import generatePDF from "../utils/doc.js";
import outputName from "../utils/outputName.js";
import generateToken from "../utils/generateToken.js";

const dir = path.join(path.resolve(), "server", "uploads");

/**
 * The function `handleUploads` takes a request and response object, and returns a JSON object with the
 * template and image names extracted from the request.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information such as the request headers, request body, request method, request URL, and
 * other relevant details.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client. It is an instance of the `http.ServerResponse` class in Node.js.
 */
const handleUploads = (req, res) => {
  res.status(200).json({
    template: req.file.filename.split(".")[0],
    image: req.image.imagename.split(".")[0],
  });
};

/**
 * The function `listTemplates` reads the contents of two directories, `templates` and `images`, and
 * returns a JSON response containing the count and list of files in those directories.
 * @param req - The `req` parameter is the request object, which contains information about the
 * incoming HTTP request such as headers, query parameters, and request body. It is used to retrieve
 * information from the client and pass it to the server.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code and sending JSON data.
 */
const listTemplates = (req, res) => {
  try {
    const templates = fs.readdirSync(path.join(dir, "templates"));
    const images = fs.readdirSync(path.join(dir, "images"));

    if (!templates || !images) {
      throw new Error("No files found.");
    }

    const list = [];

    for (let i = 0; i < templates.length; i++) {
      list.push({
        template: templates[i].split(".")[0],
        image: images[i].split(".")[0],
      });
    }

    res.status(200).json({ count: list.length, list: list });
  } catch (err) {
    res.status(500);
    throw err;
  }
};

/* The `countTemplates` function is an asynchronous handler that counts the number of templates in a
specific directory and returns the count as a JSON response. */
const countTemplates = asyncHandler(async (req, res) => {
  try {
    const templates = fs.readdirSync(path.join(dir, "templates"));
    return res.status(200).json({ count: templates.length });
  } catch (err) {
    res.status(500);
    throw new Error("Unnable to fetch.");
  }
});

/* The `getImages` function is an asynchronous handler that retrieves an image file from the server and
sends it as a response to the client. */
const getImages = asyncHandler(async (req, res) => {
  try {
    const image = req.params.id;
    res.sendFile(path.join(dir, "images", `${image}.jpeg`));
  } catch (error) {
    res.status(500);
    throw new Error("Error retrieving files");
  }
});

/* The `getResume` function is an asynchronous handler that generates a PDF document based on a
template and data provided in the request body. */
const getResume = asyncHandler(async (req, res) => {
  const data = req.body;
  const template = fs.createReadStream(
    path.join(dir, "templates", `${req.body.templateId}.docx`)
  );

  delete data.templateId;

  const result = await generatePDF(template, data);

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="${outputName()}"`,
  });

  result.writeToStream(res);
});

/**
 * The function `getToken` takes a request and response object, extracts the username from the request
 * body, creates a user object with the username and role, and then calls the `generateToken` function
 * passing the response and user object as arguments.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information such as the request method, headers, body, and query parameters. In this
 * case, `req.body` is an object that contains the data sent in the request body.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is typically an instance of the `http.ServerResponse` class in Node.js.
 */
const getToken = (req, res) => {
  const user = {
    username: req.body.username,
    role: "user",
  };
  generateToken(res, user);
};

export {
  handleUploads,
  listTemplates,
  countTemplates,
  getImages,
  getResume,
  getToken,
};
