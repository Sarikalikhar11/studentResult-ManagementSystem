import { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const UploadResult = () => {
  const [file, setFile] = useState(null); // To hold the file
  const [parsedData, setParsedData] = useState([]); // To store parsed result data
  const [uploadStatus, setUploadStatus] = useState(''); // Status message for upload

  // Handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Parse the file and extract data
  const handleFileUpload = () => {
    if (!file) {
      setUploadStatus('Please upload a file before submitting.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setParsedData(jsonData); // Store the parsed data
      uploadResultData(jsonData); // Send data to backend
    };

    reader.readAsArrayBuffer(file);
  };

  // Send the parsed data to the backend
  const uploadResultData = (resultData) => {
    axios
      .post('/api/result/upload', { results: resultData })
      .then((response) => {
        setUploadStatus('Results uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error uploading results:', error);
        setUploadStatus('Error uploading results.');
      });
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Upload Student Result Sheet</h1>

      <div className="mb-4">
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          className="border rounded p-2"
        />
      </div>

      <button
        onClick={handleFileUpload}
        className="bg-[#df5f5a] text-white px-4 py-2 rounded hover:bg-[#d6140a]"
      >
        Upload Results
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
                <th className="text-left py-2 px-4">Subject</th>
                <th className="text-left py-2 px-4">Marks</th>
              </tr>
            </thead>
            <tbody>
              {parsedData.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{row['Student ID']}</td>
                  <td className="py-2 px-4">{row['Student Name']}</td>
                  <td className="py-2 px-4">{row['Subject']}</td>
                  <td className="py-2 px-4">{row['Marks']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadResult;
