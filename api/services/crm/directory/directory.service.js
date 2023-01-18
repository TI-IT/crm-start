const dbConnect = require('../../dbConnect');
const mongoose = require('mongoose');
const Directory = require('../../../models/crm/directory');

async function saveCity(city) {
  await dbConnect();
  const collection = mongoose.model('directory');
  await collection.create({
    city: city.city,
  });
}

async function getAllCity() {
  let arrayCitys = [];
  await dbConnect();
  const collection = mongoose.model('directory');
  const citys = await collection.find({ city: { $exists: true } });
  citys.map((obj) => {
    arrayCitys.push(obj.city);
  });
  return arrayCitys;
}

module.exports = {
  saveCity,
  getAllCity,
};
