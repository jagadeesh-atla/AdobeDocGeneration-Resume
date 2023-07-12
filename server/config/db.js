import multer from "multer";
import path from "path";
import fs from "fs";
import asyncHandler from "express-async-handler";
import converttoImage from "../utils/libreOfficeImage.js";
import getFileNumber from "../utils/numOfFiles.js";

const uploads = path.join(path.resolve(), "server", "uploads");

let num = 0;

/* Creating a storage configuration for multer, a middleware for handling file
uploads in Node.js. */
const storage = multer.diskStorage({
  destination: path.join(uploads, "templates"),
  filename: function (req, file, cb) {
    if (!file.originalname.endsWith(".docx")) {
      throw new Error("Invalid file type. Accepts only docx.");
    }
    try {
      num = getFileNumber();
      const filename = "template" + num + ".docx";
      cb(null, filename);
    } catch (err) {
      throw err;
    }
  },
});

/* `const uploadFile = multer({ storage: storage });` is creating an instance of the multer middleware
with a specific storage configuration, to upload given file in the storage instance /server/uploads */
const uploadFile = multer({ storage: storage });

/* The `uploadImage` function is an asynchronous handler that is used as middleware in an Express
route. It takes three parameters: `req`, `res`, and `next`, to convert uploaded docx to image */
const uploadImage = asyncHandler(async (req, res, next) => {
  try {
    const file = req.file;
    const image = await converttoImage(file.path);
    if (!image) {
      fs.unlinkSync(file.path);
      throw new Error("Cannot save image of template.");
    }
    const imagePath = path.join(uploads, "images", `image${num}.jpeg`);
    fs.writeFileSync(imagePath, image);
    req.image = { imagename: `image${num}.jpeg` };
    next();
  } catch (err) {
    fs.unlinkSync(req.file.path);
    throw err;
  }
});

export { uploadFile, uploadImage };
