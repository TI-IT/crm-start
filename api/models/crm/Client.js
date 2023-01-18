const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema(
  {
    surname: {
      type: String,
    },
    name: {
      type: String,
    },
    phone: {
      type: Number,
    },
    organization: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  { autoCreate: true },
);

const Client = mongoose.model('clients', schema);
module.exports = Client;
