const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const port = 3000;

app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/register", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a mongoose schema for the images
const imageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

const Image = mongoose.model("Image", imageSchema);

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve static files (images) from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set up view engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", (req, res) => {
  res.render("main");
});

// Handle file upload
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });

    await newImage.save();
    res.send("Image uploaded successfully!");
  } catch (error) {
    res.status(500).send("Error uploading image");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
