// src/pages/AttendanceUpload.jsx
import { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

const UploadAttendance = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');

  // Handle file input change
  const handleFileChange = (event) => {
    setCsvFile(event.target.files[0]);
  };

  // Handle file upload (parsing CSV and sending data)
  const handleFileUpload = () => {
    if (!csvFile) {
      setUploadStatus('Please upload a file before submitting.');
      return;
    }

    Papa.parse(csvFile, {
      header: true, // Treats the first row as headers
      complete: (result) => {
        setParsedData(result.data); // Save parsed CSV data to state
        uploadAttendanceData(result.data);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        setUploadStatus('Failed to parse CSV file.');
      },
    });
  };

  // Send parsed data to backend for processing
  const uploadAttendanceData = (attendanceData) => {
    axios
      .post('/api/attendance/upload', { attendance: attendanceData })
      .then((response) => {
        setUploadStatus('Attendance uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error uploading attendance:', error);
        setUploadStatus('Error uploading attendance.');
      });
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">
        Upload Student Attendance Sheet
      </h1>

      <div className="mb-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="border rounded p-2"
        />
      </div>

      <button
        onClick={handleFileUpload}
        className="bg-[#df5f5a] text-white px-4 py-2 rounded hover:bg-[#d6140a]"
      >
        Upload Attendance
      </button>

      {uploadStatus && (
        <div className="mt-4 text-lg font-medium text-gray-700">
          {uploadStatus}
        </div>
      )}

      {parsedData.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Preview Uploaded Data</h2>
          <table className="min-w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="text-left py-2 px-4">Student ID</th>
                <th className="text-left py-2 px-4">Student Name</th>
                <th className="text-left py-2 px-4">Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              {parsedData.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{row['Student ID']}</td>
                  <td className="py-2 px-4">{row['Student Name']}</td>
                  <td className="py-2 px-4">{row['Attendance Status']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadAttendance;
