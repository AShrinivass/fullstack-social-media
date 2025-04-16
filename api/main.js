import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import users from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

const app = express();
const port = 3000;
dotenv.config();

//middelware
app.use(cors());
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use("/api/users", users);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo connection error:", err));

app.listen(port, () => {
  console.log("server is running...");
});
