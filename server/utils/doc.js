import PDFServicesSDK from "@adobe/pdfservices-node-sdk";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

// create credentials
const credentials =
  PDFServicesSDK.Credentials.servicePrincipalCredentialsBuilder()
    .withClientId(process.env.CLIENT_ID)
    .withClientSecret(process.env.CLIENT_SECRET)
    .build();

const executionContext = PDFServicesSDK.ExecutionContext.create(credentials);

/* The `generatePDF` function is a JavaScript function that uses the Adobe PDF Services SDK to generate
a PDF document by merging a template document (in DOCX format) with data provided as input. */
const generatePDF = asyncHandler(async function (template, data) {
  try {
    const jsonInput = data;

    const documentMerge = PDFServicesSDK.DocumentMerge,
      documentMergeOptions = documentMerge.options,
      options = new documentMergeOptions.DocumentMergeOptions(
        jsonInput,
        documentMergeOptions.OutputFormat.PDF
      );

    const documentMergeOperation = documentMerge.Operation.createNew(options);

    /* The code is creating a file reference object from the `template` stream. The
    `template` is the input document in DOCX format that will be used as a template for generating
    the PDF document. */
    const input = PDFServicesSDK.FileRef.createFromStream(
      template,
      process.env.DOCX_TYPE
    );
    documentMergeOperation.setInput(input);

    // Get `PDF` buffer as result
    const result = await documentMergeOperation.execute(executionContext);

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
});

export default generatePDF;
