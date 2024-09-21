const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogShema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blog", blogShema);
module.exports = Blog;
