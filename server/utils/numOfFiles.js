import fs from "fs";
import path from "path";

/**
 * The function `getFilesLength` returns the number of files in a specific directory, padded with
 * leading zeros.
 * @returns The function `getFilesLength` returns a padded number representing the length of the files
 * in the specified directory.
 */
const getFilesLength = () => {
  const dir = path.join(path.resolve(), "server", "uploads", "templates");
  try {
    const files = fs.readdirSync(dir);
    const paddedNum = String(files.length + 1).padStart(4, 0);
    return paddedNum;
  } catch (err) {
    throw new Error("Cannot read files.");
  }
};

export default getFilesLength;
