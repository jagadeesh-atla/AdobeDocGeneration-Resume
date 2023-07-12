# AdobeDocGeneration-Resume

This repository contains a submission to the Adobe PapyrusNebulae 2023 Document Cloud Hackathon: Round 2.

## Problem Statement

This challenge aims to create a Resume Builder API that uses the Adobe Document Generation API to
dynamically create PDF resumes from DOCX based templates.

- **Sample Templates -** [here](https://drive.google.com/file/d/1UDstoJjeMC0qV9zhEDAJ5UsuIFMfv_ht/view?usp=sharing)
- **API Specification** - [here](https://acrobat.adobe.com/id/urn:aaid:sc:AP:07cb1a4c-4503-4e87-9f80-824088cc1c01)
- **Sample API Request** - [here](https://drive.google.com/file/d/1JSP-xgqLYuOdWXV9NulbaX6IPHHL7zC5/view?usp=drive_link)

## Description

A Resume Builder API is a tool that allows users to create professional resumes quickly and easily.
The API uses pre-built templates and dynamically generates the resume content based on the user's
input data, such as personal information, skills, experiences, and education. This reduces the manual
effort required to create and format a resume.

## Output

#### GET /

A HTML page with all available templates.

### API Routes

#### POST /api/resume

**Response** : A PDF with requested data in request template format, generated from Adobe API Services.

Same Request

```json
{
  "templateId": "template0001",
  "Name": "Lorem",
  "LastName": "ipsum",
  "EmailAddress": "ipsum@abc.com",
  "PhoneNumber": "+91 99xx14xx99",
  "LinkedIn": "<a href=\"https://www.linkedin.com\">linkedIn</a>",
  "JobTitle": "Software Development Engineer",
  "Summary": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
  "Skills": ["Java", "Data Structure", "ReactJs"],
  "Education": [
    {
      "SchoolName": "School",
      "Year": "201X-201Y",
      "Description": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
    },
    {
      "SchoolName": "College",
      "Year": "203X-203Y",
      "Description": "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
    }
  ],
  "Experience": [
    {
      "CompanyName": "Adobe",
      "Year": "201X-201Y",
      "Description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
    }
  ],
  "Achievements": [
    {
      "Type": "Academics",
      "Description": "Lorem ipsum dolor sit amet"
    },
    {
      "Type": "Sports",
      "Description": "consectetuer adipiscing elit"
    }
  ]
}
```

#### GET /api/templates

**Response** : A json object with total number of templates available, and array of template and image ids.

```json
{
  "count": 1,
  "list": [
	"templateId": "template0001",
	"imageId": "image0001"
    ]
}
```

#### GET /api/templates/count

**Response** : A JSON object with total number of templates available.

```json
{
  "count": 1
}
```

#### GET /api/templates/count

**Response** : A JSON object with total number of templates available.

```json
{
  "count": 1
}
```

#### GET /api/image/:id

**Response** : Image with whose id is `:id`.

#### GET /api/login

**Request** : A JSON object with only one property `username`.

**Response** : A JWT token for verification.

## Use your own template

### POST /api/upload

Refer Adobe Documentation to create own templates at [here](https://developer.adobe.com/document-services/docs/overview/document-generation-api/templatetags/)

**Request**: Send a form-data request containing `.docx` file.

**Response**: A JSON object containing template id, note it for further usage.

### ADMIN Routes

#### GET /api/admin

**Request** : set `Authorization` header with `token` value for verification.

**Response** : Welcome message

#### DELETE /api/admin/delete

**Request** : set `Authorization` header with `token` value for verification.

**Response** : Success message

#### DELETE /api/admin/delete/:id

**Request** : set `Authorization` header with `token` value for verification. And to delete specific template of id:`:id`.

**Response** : Success message

## Run Locally

#### Requirements

- `LibreOffice` should be installed
- `NodeJs` latest
- `NPM` latest

```bash
npm install
npm start
```

Get your own Adobe API credentials at [here](https://acrobatservices.adobe.com/dc-integration-creation-app-cdn/main.html?api=document-generation-api)

Don't forget to get environment variable `.env`, see `.env.example` for reference.

## Deployment

This API is deployed using docker on render platform(Link in about).

## Additional

In this project, templates are stored within the server for better accessability and speed. You can refer logic for using MongoDB is [here](https://github.com/jagadeesh-atla/resumeBuilder-mongodb).

## Folder Structure

```bash
.

├── Dockerfile
├── README.md
├── out.md
├── package-lock.json
├── package.json
├── server
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── adminController.js
│   │   └── apiController.js
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── routes
│   │   ├── adminRoute.js
│   │   └── apiRoutes.js
│   ├── server.js
│   ├── uploads
│   │   ├── images
│   │   │   └── image0001.jpeg
│   │   └── templates
│   │       └── template0001.docx
│   └── utils
│       ├── _image.js
│       ├── deleteFiles.js
│       ├── doc.js
│       ├── generateToken.js
│       ├── libreOfficeImage.js
│       ├── numOfFiles.js
│       └── outputName.js
└── views
    └── index.ejs

10 directories, 23 files
```
