const Job = require("../model/jobsModel");
// const { CustomErrorApi } = require('../err/index');
const CustomErrorApi = require("../err/customError");

const getAllVideos = async (req, res) => {
  try {
    const allJobs = await Job.find({});
    res.status(200).json(allJobs);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getJob = async (req, res, next) => {
  try {
    console.log(req?.user, req.params);
    const {
      params: { _id },
      user: { userId },
    } = req;
    const isJob = await Job.findOne({ _id: req.params.id });
    if (!isJob) {
      const error = new CustomErrorApi("its not found dude");
      error.status = 404;
      return next(error);
      res.status(404).json({ msg: error, invalid_ID: req.params.id });
    }
    res.status(201).json({ result: isJob, code: 0 });
  } catch (error) {
    res.status(404).json({ msg: error, invalid_ID: req.params.id });
  }
};

const deleteJob = (req, res) => {
  res.send("HEllo deleteJob");
};
const updateJob = (req, res) => {
  res.send("HEllo update Job");
};

module.exports = {
  getAllVideos,
};
