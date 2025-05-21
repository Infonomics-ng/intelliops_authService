import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import db from "./config/Database.js";
import baseModuleRouter from "./routes/baseModuleRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const whitelist = ["http://localhost:5173", "http://127.0.0.1:5173"];

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    } else if (whitelist.indexOf(origin) === -1) {
      return callback(new Error("not allowed by CORS"), false);
    }
    return callback(null, true);
  },
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  next();
});

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api/v2/auth", baseModuleRouter);

app.get("*", (req, res, next) => {
  res.redirect("/");
});

const port = 8081;

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...", err);
  process.exit(1);
});

db.authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
    db.query('SET GLOBAL sql_mode="ORACLE";')
      .then(() => {
        console.log("SQL mode has been set.");
      })
      .catch((err) => {
        console.error("Error setting SQL mode:", err);
      });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down... WITH ERROR ", err);
  server.close(() => {
    process.exit(1);
  });
});
