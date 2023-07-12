/**
 * The function `createOutputFileName` generates a unique filename for a PDF file based on the current
 * date and time.
 * @returns The function `createOutputFileName` returns a string that represents the output file name.
 * The file name is generated based on the current date and time, and it follows the format
 * "resumeYYYY-MM-DDTHH-MM-SS.pdf".
 */
const createOutputFileName = () => {
  let date = new Date();
  let dateString =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2) +
    "T" +
    ("0" + date.getHours()).slice(-2) +
    "-" +
    ("0" + date.getMinutes()).slice(-2) +
    "-" +
    ("0" + date.getSeconds()).slice(-2);
  return "resume" + dateString + ".pdf";
};

export default createOutputFileName;
