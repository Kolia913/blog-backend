const Category = require('../model/Category');
const strToSlug = require('../slug');
const { categoryValidation } = require('../validation');

const getAll = async (req, res) => {
  const categories = await Category.find().exec();
  res.status(200).json(categories);
};

const findBySlug = async (req, res) => {
  const category = await Category.findOne({
    slug: req.params.slug,
  }).exec();
  if (!category) {
    return res.status(400).send(`Category ${req.params.slug} not found!`);
  }
  res.status(200).json(category);
};

const addCategory = async (req, res) => {
  const {error} = categoryValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const slug = strToSlug(req.body.title);

  const categorySlug = await Category.findOne({
    slug: slug,
  });

  if (categorySlug) {
    return res.status(400).send('Category already exists!');
  }
  const category = new Category({
    title: req.body.title,
    slug: slug,
    color: req.body.color,
    description: req.body.description,
  });

  try {
    const savedCategory = await category.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(400).send(err);
  }
};

const editCategory = async (req, res) => {
  const {
    error,
  } = categoryValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const category = {
    title: req.body.title,
    color: req.body.color,
    description: req.body.description,
  };

  try {
    const updatedCategory = await Category.findOneAndUpdate({
      slug: req.params.slug,
    }, category, {
      new: true,
    });
    if (!updatedCategory) {
      return res.status(400).send(`Category not ${req.params.slug} not found!`);
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(400).send(err);
  }

};

const removeCategory = async (req, res) => {
  const removedCategory = await Category.findOneAndRemove({
    slug: req.params.slug,
  });
  if (!removedCategory) {
    return res.status(400).send(`Category not found!`);
  }
  res.status(200).json(removedCategory);
};

module.exports = {
  getAll,
  findBySlug,
  addCategory,
  editCategory,
  removeCategory,
};
