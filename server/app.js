const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const blogRoutes = require("./routes/BlogRoutrs");
app.use(express.json());
const PORT = process.env.PORT || 3000;
//connect to mongodb
const dbUrl = process.env.dbUrl;
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
app.use("/api/blogs", blogRoutes);
app.use((req, res) => {
  res.render("404", { title: "404" });
});
