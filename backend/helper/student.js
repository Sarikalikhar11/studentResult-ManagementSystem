import StudentModel from '../model/studentModel.js'; // Adjust the import path as necessary

const getSchoolInitials = (schoolName) => {
    return schoolName.split(' ').map(word => word[0].toUpperCase()).join('').slice(0, 3);
};

// function creates  a UNIQUE Student id based on School NAme , student class and Roll Number
export const createStudentId = async (schoolName, studentClass, rollNumber) => {
    try {
        let id;
        let isUnique = false;

        const schoolInitials = getSchoolInitials(schoolName);
        const classPart = studentClass.toString().toUpperCase();
        const rollPart = rollNumber.toString().padStart(2, '0'); // Ensure roll number is at least 2 digits

        while (!isUnique) {
            id = `${schoolInitials}${classPart}${rollPart}`;

            // Ensure the ID is unique
            const existingStudent = await StudentModel.findOne({ studentId: id });
            if (!existingStudent) {
                isUnique = true;
            } else {
                // If not unique, modify roll number slightly to try again
                rollNumber = parseInt(rollNumber) + 1000;
            }
        }
        console.log("Student ID" , id);

        return id;
    } catch (error) {
        throw new Error('Error generating student ID');
    }
};