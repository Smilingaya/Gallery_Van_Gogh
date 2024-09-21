const express = require("express");
const mongoose = require("mongoose");
const app = express();
const blogRoutes = require("./routes/BlogRoutrs");
app.use(express.json());
//connect to mongodb
const dbUrl =
  "mongodb+srv://aya:12345@smiling.pgesm.mongodb.net/Blog_img?retryWrites=true&w=majority";
mongoose
  .connect(dbUrl)
  .then((resault) => app.listen(4000))
  .catch((err) => console.log(err));

app.use("/api/blogs", blogRoutes);
app.use((req, res) => {
  res.render("404", { title: "404" });
});
