import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    studentId : {
        type: String, 
        required: true, 
        unique: true
    },
    name : {
        type: String, 
        required: true 
    },
    email : {
      type: String, 
      unique: false
    },
    phoneNumber : {
      type : String,
      required : true,
      unique : false
    },
    password: {
      type: String,  
      required: true  
    },
    school : {
      type: String
    },
    classroom : {
      type: String
    },
    rollNumber : {
        type : Number,
        required : true
    },
    subjects : [{
        type : String
    }],
    Attendance : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Attendance"
    }]
});

const StudentModel = mongoose.model('Student', studentSchema);

export default StudentModel;
