const { generateFourDigitNumber } = require("../helpers/helper.js");
const Question = require("../models/form.js");

const getAllRecords = async (req, res, next) => {
  try {
    const { lim } = req.query;
    const allRecords = await DataModel.find({}).limit(lim * 1);

    if (!allRecords) {
      return res.status(404).json({
        message: "Records not Found",
        data: [],
      });
    }

    res.status(201).json({
      message: "All Records Fetched Suucessfully",
      data: allRecords,
    });
  } catch (error) {
    next();
  }
};

const getAllAverageRecords = async (req, res, next) => {
  try {
    const { lim } = req.query;
    const allRecords = await DataModel.find({}).limit(lim * 1);

    if (!allRecords) {
      return res.status(404).json({
        message: "Records not Found",
        data: [],
      });
    }

    let output = [];

    const intensityColl = allRecords?.map((int, i) => int?.intensity);
    const likelihoodColl = allRecords?.map((like, i) => like?.likelihood);
    const relevanceColl = allRecords?.map((rel, i) => rel?.relevance);

    const avgIntensity = intensityColl.reduce((acc, currVal) => {
      return acc + currVal;
    }, 0);

    const avgLikelihood = likelihoodColl.reduce((acc, currVal) => {
      return acc + currVal;
    }, 0);

    const avgRelevance = relevanceColl.reduce((acc, currVal) => {
      return acc + currVal;
    }, 0);

    output.push(avgIntensity);
    output.push(avgLikelihood);
    output.push(avgRelevance);

    res.status(201).json({
      message: "All Records Fetched Successfully",
      data: output,
    });
  } catch (error) {
    next();
  }
};

const createForm = async (req, res) => {
  try {
    const { title, cat, cloze, comp } = req.body;

    // if (!cat.description || cat.categories === "" || !cat.categoryAns.cat) {
    //   return;
    // }

    const randomNumber = generateFourDigitNumber();
    const tag = `${title}-${randomNumber}`;
    const lnk = process.env.URL;
    let url = `${lnk}form/${tag}`;

    const question = new Question({
      title,
      cats: cat,
      clozes: cloze,
      comps: comp,
      link: url,
      tag: tag,
    });

    const savedQuestion = await question.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error saving question:", error);
    res.status(500).json({ message: "Failed to save question", error });
  }
};

const getAllForms = async (req, res) => {
  try {
    const forms = await Question.find();
    return res.status(201).json(forms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ message: "Error fetching forms", error });
  }
};

const getQuiz = async (req, res) => {
  try {
    const tag = req.params.val;

    if (!tag) {
      return;
    }
    const form = await Question.findOne({ tag: tag });
    return res.status(201).json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).json({ message: "Error fetching form", error });
  }
};

module.exports = {
  getAllRecords,
  getAllAverageRecords,
  createForm,
  getAllForms,
  getQuiz,
};
