const { Router } = require("express");
const Blog = require("../models/blog");
//create_blog_post,get_all_blogs,delet_blog,update_blog,get_blog
// post_blog_comments,get_blog_comments,delet_blog_comment
const create_blog_post = (req, res) => {
  const { title, content, imageUrl } = req.body;
  const id = `post${Math.floor(Math.random() * 100000)}`;
  const blog = new Blog({ id, title, content, imageUrl });

  blog
    .save()
    .then((result) => res.status(201).json(result))
    .catch((err) => res.status(400).json({ message: err.message }));
};

const get_all_blogs = (req, res) => {
  Blog.find()
    .then((results) => res.status(200).json(results))
    .catch((err) => res.status(400).json({ message: err.message }));
};
const delet_blog = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((results) =>
      res.status(200).json({ message: "blog deletes successfully" })
    )
    .catch((err) => res.status(500).json({ message: err.message }));
};
const update_blog = (req, res) => {
  const { title, content, imageUrl } = req.body;
  const id = req.params.id;
  Blog.findByIdAndUpdate(id, { title, content, imageUrl }, { new: true })
    .then((results) => res.status(200).json(results))
    .catch((err) => res.status(500).json({ message: err.message }));
};
const get_blog = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((resault) => res.status(201).json(resault))
    .catch((err) => console.log(err));
};
//comment
const post_blog_comments = async (req, res) => {
  try {
    const { content } = req.body;

    const blog = await Blog.findById(req.params.blogId);
    const newComment = {
      content,
    };

    blog.comments.push(newComment);
    await blog.save();

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const get_blog_comments = async (req, res) => {
  try {
    const id = req.params.blogId;
    const blog = await Blog.findById(id);
    res.status(200).json(blog.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const delet_blog_comment = async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const blog = await Blog.findById(blogId);
    const commentIndex = blog.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );
    console.log(commentIndex);
    blog.comments.splice(commentIndex, 1);
    await blog.save();
    res.status(200).json(blog.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  create_blog_post,
  get_all_blogs,
  delet_blog,
  update_blog,
  get_blog,
  post_blog_comments,
  get_blog_comments,
  delet_blog_comment,
};
