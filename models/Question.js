// models/Question.js
const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  tags: [String],
  difficulty: Number
});
module.exports = mongoose.model('Question', QuestionSchema);
