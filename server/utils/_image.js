import axios from "axios";
import FormData from "form-data";
import asyncHandler from "express-async-handler";

// Get image buffer using thirdParty API
const getImage = asyncHandler(async (fileName) => {
  const formData = new FormData();
  formData.append(
    "instructions",
    JSON.stringify({
      parts: [
        {
          file: "document",
        },
      ],
      output: {
        type: "image",
        format: "jpg",
        quality: 60,
        dpi: 200,
      },
    })
  );
  formData.append("document", fileName);

  try {
    const response = await axios.post(
      "https://api.pspdfkit.com/build",
      formData,
      {
        headers: formData.getHeaders({
          Authorization: `Bearer ${process.env.API_KEY}`,
        }),
        responseType: "arraybuffer",
      }
    );
    const imageBuffer = Buffer.from(response.data, "binary");
    return imageBuffer;
  } catch (err) {
    throw new Error(err.message);
  }
});

export default getImage;
