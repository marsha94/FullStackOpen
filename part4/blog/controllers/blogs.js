import { Router } from "express";
import Blog from "../models/blog.js";

const blogsRouter = Router();

blogsRouter.get("/", (req, res) => {
  Blog.find({})
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", (req, res) => {
  const blog = new Blog(req.body);
  console.log(blog);
  blog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => next(error));
});

export default blogsRouter;
