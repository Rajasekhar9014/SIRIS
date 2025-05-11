const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
const fs = require("fs");

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/job-portal-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
})

// mongoose
//   .connect("mongodb://localhost:27017/job-portal-db", {
//   // .connect("mongodb://127.0.0.1:27017/jobPortal", {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false,
//   })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

const app = express();
const port = 4444;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const fs = require("fs");
// const passportConfig = require("./lib/passportConfig");

// // Create Express app
// const app = express();
// const port = 4444;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(passportConfig.initialize());

// // Create required directories if they don't exist
// const uploadDirs = ["./public", "./public/resume", "./public/profile"];
// uploadDirs.forEach((dir) => {
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir);
//   }
// });

// // MongoDB Connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/job-portal-db", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ Connected to MongoDB");
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error.message);
//     process.exit(1); // Stop the server if DB connection fails
//   }
// };

// // Routes
// app.use("/auth", require("./routes/authRoutes"));
// app.use("/api", require("./routes/apiRoutes"));
// app.use("/upload", require("./routes/uploadRoutes"));
// app.use("/host", require("./routes/downloadRoutes"));

// // Start server after DB is connected
// connectDB().then(() => {
//   app.listen(port, () => {
//     console.log(`🚀 Server started on http://localhost:${port}`);
//   });
// });
