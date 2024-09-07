const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sameergoelmail:FkAI7GahWDg7kPcv@cluster0.pbzmr.mongodb.net/')

const tokenSchema = new mongoose.Schema({
  tokenId: { type: String, required: true },
  pinataUrl: { type: String, required: true }
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
