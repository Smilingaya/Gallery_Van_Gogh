const express = require("express");
const router = express.Router();
const BlogController = require("../controller/blogControler");
router.get("/", BlogController.get_all_blogs);
router.post("/", BlogController.create_blog_post);
router.delete("/:id", BlogController.delet_blog);
router.put("/:id", BlogController.update_blog);
router.get("/:id", BlogController.get_blog);
router.post("/:blogId/comments", BlogController.post_blog_comments);
router.get("/:blogId/comments", BlogController.get_blog_comments);
router.delete(
  "/:blogId/comments/:commentId",
  BlogController.delet_blog_comment
);
module.exports = router;
