const dbConnect = require('../../dbConnect');
const mongoose = require('mongoose');
const Products = require('../../../models/crm/Products');

async function save(product) {
  await dbConnect();
  const collection = mongoose.model('products');
  await collection.create({
    contractor: product.contractor,
    type: product.type,
    category: product.category,
    subCategory: product.subCategory,
    name: product.name,
    article: product.article,
    finishing: product.finishing,
    unit: product.unit,
    costPrice: product.costPrice,
    urlImage: product.urlImage,
  });
}

async function getAllProducts() {
  await dbConnect();
  const collection = mongoose.model('products');
  const products = await collection.find({});
  return products;
}

module.exports = {
  save,
  getAllProducts,
};
