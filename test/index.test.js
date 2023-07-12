import fs from "fs";
import request from "supertest";
import { expect } from "expect";

const url = "https://resumeapi-rohn.onrender.com";

describe("GET /", () => {
  it("should return with homepage", async () => {
    const response = await request(url).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("<img src");
  });
});

describe("GET /api", () => {
  it("should return with welcome message", async () => {
    const response = await request(url).get("/api");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hi from API");
  });
});

describe("POST /api/upload", () => {
  it("should upload docx and return with templateId", async () => {
    const response = await request(url)
      .post("/api/upload")
      .attach("template", "test/test.docx");
    expect(response.status).toBe(200);
    expect(response._body.template).toContain("template");
    expect(response._body.image).toContain("image");
  });
});

describe("GET /api/templates", () => {
  it("should list of templates", async () => {
    const response = await request(url).get("/api/templates");
    expect(response.status).toBe(200);
    expect(response._body.count).toBeGreaterThanOrEqual(0);
    if (response._body.count) {
      expect(response._body.list[0].template).toContain("template");
      expect(response._body.list[0].image).toContain("image");
    }
  });
});

describe("GET /api/image/:id", () => {
  it("should return image", async () => {
    const id = "image0001";
    const response = await request(url).get("/api/image/" + id);
    expect(response.status).toBe(200);
    expect(response.text).toBeUndefined();
  });
});

describe("GET /api/templates/count", () => {
  it("should return image", async () => {
    const response = await request(url).get("/api/templates/count");
    expect(response.status).toBe(200);
    expect(response._body.count).toBeGreaterThanOrEqual(0);
  });
});

describe("POST /api/resume", () => {
  it("should return pdf", async () => {
    const filePath = "test/test.json";
    const fileData = fs.readFileSync(filePath, "utf8");

    const response = await request(url)
      .post("/api/resume")
      .send(JSON.parse(fileData));
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/pdf");
  });
});

let testToken;
describe("GET /api/login", () => {
  it("should return token", async () => {
    const response = await request(url)
      .get("/api/login")
      .send({ username: "testUser" });
    testToken = response._body.token;
    const token = response._body.token.split(".");
    expect(token.length).toBe(3);
  });
});

describe("GET /api/admin", () => {
  it("should not give access for wrong token", async () => {
    const response = await request(url)
      .get("/api/admin")
      .set("Authorization", testToken);
    expect(response._body.message).toContain("Not authorized");
  });
});

const adminToken = "<enter your admin token>";
describe("GET /api/admin", () => {
  it("should give access for correct token", async () => {
    const response = await request(url)
      .get("/api/admin")
      .set("Authorization", adminToken);
    expect(response.statusCode).toBe(200);
    expect(response._body.message).toContain("Hello Admin");
  });
});
