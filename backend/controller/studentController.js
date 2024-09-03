import { comparePassword, hashPassword } from "../helper/password.js";
import { createStudentId } from "../helper/student.js";
import { generateToken } from "../helper/token.js";
import StudentModel from "../model/studentModel.js";

export const registerStudent = async (req, res) => {
    try{
        const {
            name,
            email,
            phoneNumber,
            password,
            school,
            classroom,
            rollNumber,
            subjects
        } = req.body;

        if(!name 
            || !email
            || !phoneNumber
            || !password
            || !school
            || !classroom
            || !rollNumber
            || !subjects
        ){
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        }
        const studentId = await createStudentId(school, classroom, rollNumber);

        const isStudent = await StudentModel.findOne({studentId});
        console.log(`STUDENT WITH ${isStudent.studentId} already exists `, isStudent);
        if(isStudent){
            return res.status(400).json({
                message: "Student already exists",
                name : isStudent.name,
            });
        }

        const newStudent = new StudentModel({
            studentId,
            name,
            email,
            phoneNumber,
            password : await hashPassword(password),
            school,
            classroom,
            rollNumber,
            subjects
        });

        await newStudent.save();

        const token = generateToken(name, rollNumber, classroom, "student");
        
        res.cookie('authToken' , token, {
            httpOnly : true,
            secure : true,
            maxAge : 24*60*60*1000
        });

        res.status(200).json({
            message: "Student registered successfully",
            student: newStudent
        });
    }catch(error){
        console.log("Error in registerStudent", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
}

export const loginStudent = async(req, res)=>{
    try{
        const {
            studentId,
            password
        } = req.body;

        if(!studentId || !password){
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        }

        const isStudent = StudentModel.findOne({studentId});
        if(!isStudent){
            return res.status(404).json({
                message: "Student does not exist"
            });
        }
        if(!comparePassword(password , isStudent.password)){
            return res.status(400).json({
                message: "Invalid password"
            });
        }
        const token = generateToken(isStudent.name, isStudent.rollNumber, isStudent.section);

        res.cookie('authToken' , token, {
            httpOnly : true,
            secure : true,
            maxAge : 24*60*60*1000
        });

        res.status(200).json({
            message: "Logged in Successfully",
            student: isStudent
        });
    }catch(error){
        console.log("Error in loginStudent", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
}