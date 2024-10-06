const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    sclass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
        required: true,
    },
    attendance: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student',
            required: true,
        },
        status: {
            type: String,
            enum: ['Present', 'Absent'],
            required: true,
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model("attendance", attendanceSchema);