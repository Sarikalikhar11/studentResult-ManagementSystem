const Attendance = require("../models/attendanceSchema");
const xlsx = require("xlsx");
const multer = require("multer");
const path = require("path");

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Create a new attendance record
export const createAttendance = async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        await attendance.save();
        res.status(201).send(attendance);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get attendance records for a class
export const getClassAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({ sclass: req.params.classId });
        res.status(200).send(attendance);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get attendance records for a student
export const getStudentAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({ "attendance.student": req.params.studentId });
        res.status(200).send(attendance);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Upload attendance from Excel file
export const uploadAttendance = async (req, res) => {
    try {
        const { schoolId, classId } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).send("No file uploaded");
        }

        const workbook = xlsx.readFile(file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        const dates = data[0].slice(1); // Extract dates from the first row
        const attendanceRecords = [];

        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            const studentName = row[0];

            for (let j = 1; j < row.length; j++) {
                const status = row[j];
                const date = dates[j - 1];

                const attendanceRecord = {
                    date: new Date(date),
                    sclass: classId,
                    attendance: [{
                        student: studentName,
                        status: status === 'P' ? 'Present' : 'Absent'
                    }]
                };

                attendanceRecords.push(attendanceRecord);
            }
        }

        await Attendance.insertMany(attendanceRecords);
        res.status(201).send("Attendance records uploaded successfully");
    } catch (error) {
        res.status(400).send(error);
    }
};

// Export multer upload middleware
export const uploadMiddleware = upload.single('file');