const express = require("express");
const router = express.Router();
const {
    getAllJobs,
    getJob,
    createJob,
} = require("../controller/jobsControl");

router.route("/create").post(createJob)

module.exports = router;