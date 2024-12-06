const mongoose = require("mongoose");

// Cat Subschema
const CatSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  description: { type: String, default: "" },
  categories: [
    {
      id: { type: Number, required: true },
      name: { type: String, default: "" },
    },
  ],
  categoryAns: [
    {
      cat: { type: String, default: "" },
      ans: { type: String, default: "" },
    },
  ],
  points: { type: Number, default: 0 },
});

// Cloze Subschema
const ClozeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  filledQuestion: { type: Array, default: "" },
  question: { type: String, default: "" },
  answers: [{ type: String }],
  points: { type: Number, default: 0 },
});

// Comp Subschema
const CompSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  paragraph: { type: String, default: "" },
  mq: [
    {
      id: { type: Number, required: true },
      question: { type: String, default: "" },
      options: {
        option1: { type: String, default: "" },
        option2: { type: String, default: "" },
        option3: { type: String, default: "" },
        option4: { type: String, default: "" },
      },
      answer: { type: String, default: "" },
      state: { type: Boolean, default: true },
      points: { type: Number, default: 0 },
    },
  ],
  points: { type: Number, default: 0 },
});

// Main Question Schema
const QuestionSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  cats: [CatSchema],
  clozes: [ClozeSchema],
  comps: [CompSchema],
  link: { type: String, default: "" },
  tag: { type: String, default: "" },
});

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
