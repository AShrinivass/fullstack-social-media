import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import users from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middelware
app.use(express.json({ limit: "20mb" }));
app.use(cors({ origin: "*" }));
app.use(morgan("common"));
app.use(helmet());
app.use("/api/users", users);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.use(express.urlencoded({ extended: true, limit: "20mb" }));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo connection error:", err));

app.use("/images", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(
  "/images",
  cors({ origin: "*" }),
  express.static(path.join(__dirname, "public/images"))
);

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.listen(port, () => {
  console.log("server is running...");
});
