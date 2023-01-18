const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema(
  {
    contractor: {
      type: String,
    },
    type: {
      type: String,
    },
    category: {
      type: String,
    },
    subCategory: {
      type: String,
    },
    name: {
      type: String,
    },
    article: {
      type: String,
    },
    finishing: {
      type: String,
    },
    unit: {
      type: String,
    },
    costPrice: {
      type: Number,
    },
    urlImage: {
      type: String,
    },
  },
  { autoCreate: true },
);

const Products = mongoose.model('products', schema);
module.exports = Products;
