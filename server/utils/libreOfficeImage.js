import path from "path";
import fs from "fs";
import libre from "libreoffice-convert";
import asyncHandler from "express-async-handler";
import util from "util";
libre.convertAsync = util.promisify(libre.convert);

/* The code defines a function named `main` using arrow function syntax. The function is marked as
`async` and takes a single parameter `filePath`. */
const main = asyncHandler(async (filePath) => {
  const ext = ".jpeg";
  const docxBuf = fs.readFileSync(filePath);
  let outBuf = await libre.convertAsync(docxBuf, ext, undefined);
  return outBuf;
});

export default main;
