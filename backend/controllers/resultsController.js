import results from "../data/resultsData.js";

export const getResults = (req, res) => {
  res.status(200).json(results);
};
