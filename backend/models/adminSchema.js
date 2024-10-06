const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Admin"
    },
    schoolName: {
        type: String,
        unique: true,
        required: true
    },
    schoolId : {
        type: String,
        unique: true,
        required: false
    }
});
// Pre-save hook to generate school ID
adminSchema.pre('save', function(next) {
    if (this.isNew) {
        const year = new Date().getFullYear().toString().slice(-2);
        const schoolNamePart = this.schoolName.slice(0, 3).toUpperCase();
        this.schoolId = `${schoolNamePart}${year}`;
    }
    next();
});

module.exports = mongoose.model("admin", adminSchema)