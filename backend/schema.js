const mongoose = require('mongoose');
require('dotenv').config();

const tokenSchema = new mongoose.Schema({
  tokenId: { type: String, required: true },
  pinataUrl: { type: String, required: true }
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
