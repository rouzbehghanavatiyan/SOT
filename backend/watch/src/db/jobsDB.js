const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');

const jobsDB = (URI) => {
    return mongoose.connect(URI)
}

module.exports = jobsDB