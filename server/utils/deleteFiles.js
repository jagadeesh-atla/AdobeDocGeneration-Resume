import fs from "fs";
import path from "path";

/**
 * The function `deleteFiles` recursively deletes all files in a given folder path.
 * @param folderPath - The `folderPath` parameter is a string that represents the path to the folder
 * from which you want to delete files.
 */
function deleteFiles(folderPath) {
  fs.readdirSync(folderPath).forEach((file) => {
    const filePath = path.join(folderPath, file);
    if (fs.statSync(filePath).isFile()) {
      // Delete the file
      fs.unlinkSync(filePath);
    } else {
      // Recursively delete files in subfolder
      deleteFiles(filePath);
    }
  });
}

export default deleteFiles;
