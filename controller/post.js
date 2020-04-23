const Post = require('../model/Post');
const strToSlug = require('../slug');
const upload = require('../controller/file-upload');
const { postValidation } = require('../validation');
const fs = require('fs');

const getAll = async (req, res) => {
  const posts = await Post.find().exec();
  res.status(200).json(posts);
};

const findBySlug = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).exec();
  if (!post) {
    return res.status(400).send(`Post ${req.params.slug} not found`);
  }
  res.status(200).json(post);
};

const findByCategory = async (req, res) => {
  const posts = await Post.find({ categorySlug: req.params.categorySlug });
  if (!posts) {
    return res.status(400).send('No posts in this category');
  }
  res.status(200).json(posts);
};

const findByAuthor = async (req, res) => {
  const posts = await Post.find({ authorId: req.params.authorId });
  if (!posts) {
    return res.status(400).send(`No posts:(`);
  }
  res.status(200).json(posts);
};

const addPost = async (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  if (!req.file) {
    return res.status(400).send(`No image selected!`);
  }
  const reqFile = `${url}/uploads/${req.file.filename}`;
  //Validation
  const { error } = postValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const slug = strToSlug(req.body.title);

  const postSlug = await Post.findOne({ slug: slug });
  if (postSlug) {
    return res.status(400).send(`Post already exists!`);
  }

  const post = new Post({
    title: req.body.title,
    slug: slug,
    description: req.body.description,
    content: req.body.content,
    authorId: req.body.authorId,
    categorySlug: req.body.categorySlug,
    image: reqFile,
    created_at: Date.now(),
  });
  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(400).send(err);
  }
};
// fix bug with empty request body
const editPost = async (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  //Validation
  const { error } = postValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const updatedPost = await Post.findOne({ slug: req.params.slug });
  if (!updatedPost) {
    return res.status(400).send(`Post not found!`);
  }
  const updates = {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    categorySlug: req.body.categorySlug,
    updated_at: Date.now(),
  };
  if (req.file) {
    const file = updatedPost.image.replace(url + '/', '');
    const reqFile = `${url}/uploads/${req.file.filename}`;
    updates.image = reqFile;
    fs.unlinkSync(file);
  }
  try {
    await updatedPost.update(updates, { new: true });
    //console.log(updatedPost)
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).send(err);
  }
};

const removePost = async (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const removedPost = await Post.findOne({ slug: req.params.slug });
  const file = removedPost.image.replace(url + '/', '');
  fs.unlinkSync(file);
  removedPost.remove();
  if (!removedPost) {
    return res.status(400).send(`Post not found!`);
  }
  res.status(200).json(removedPost);
};

module.exports = {
  getAll,
  findBySlug,
  findByCategory,
  findByAuthor,
  addPost,
  editPost,
  removePost,
};
