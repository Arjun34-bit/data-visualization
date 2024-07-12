const DataModel = require("../models/dataModel");

const getAllRecords = async (req, res, next) => {
  try {
    const { lim } = req.query;
    const allRecords = await DataModel.find({}).limit(lim * 1);
    console.log(allRecords.length);

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

module.exports = { getAllRecords };
