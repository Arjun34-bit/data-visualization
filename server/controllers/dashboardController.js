const DataModel = require("../models/dataModel");

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

module.exports = { getAllRecords, getAllAverageRecords };
