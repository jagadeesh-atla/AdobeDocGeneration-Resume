import path from "path";
import fs from "fs";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import methodOverride from "method-override";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import apiRoutes from "./routes/apiRoutes.js";
import adminRoutes from "./routes/adminRoute.js";
import cors from "cors";

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);
app.use("/api/admin", adminRoutes);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "server", "uploads")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const imagesDir = fs.readdirSync(
    path.join(__dirname, "server", "uploads", "images")
  );
  const images = [];
  imagesDir.forEach((image) => {
    const obj = {
      link: `/images/${image}`,
      caption: image.replace("image", "template").split(".")[0],
    };
    images.push(obj);
  });
  res.render("index.ejs", { images });
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server @ ${port}`);
});

export default app;
