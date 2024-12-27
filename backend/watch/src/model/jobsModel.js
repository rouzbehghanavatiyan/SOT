const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: [true, "please provide company name!"]
    },
    right: {
        type: String,
        // required: [true, "please provide right!"]
    },
    date: {
        type: Date,
        require: true
    }
})

module.exports = mongoose.model("Job", JobSchema)