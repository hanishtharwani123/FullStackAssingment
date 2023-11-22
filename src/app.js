const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());

const static_path = path.join(__dirname, "../public");

app.use(express.static(static_path));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", (req, res) => {
  res.render("main");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
