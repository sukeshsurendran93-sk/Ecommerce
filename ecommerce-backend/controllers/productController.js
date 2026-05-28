import Product from "../models/product.js";

const getProducts = async (req, res) => {
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const category = req.query.category ? { category: req.query.category } : {};
  const minPrice = req.query.minPrice
    ? { price: { $gte: req.query.minPrice } }
    : {};
  const maxPrice = req.query.maxPrice
    ? { price: { $lte: req.query.maxPrice } }
    : {};
  const products = await Product.find({
    ...keyword,
    ...category,
    ...minPrice,
    ...maxPrice,
  });
  res.json(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

/*
const submitForm = (req, res) => {
  try {
    const { name, address } = req.body;
    const image = req.file ? req.file.path : null;

    res.status(200).json({
      success: true,
      message: "Form submitted successfully",
      data: {
        name,
        address,
        image,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
*/

const createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    image,
  });
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(product);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product removed" });
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
