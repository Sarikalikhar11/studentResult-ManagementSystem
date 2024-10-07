const express = require('express');

const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Route = require('./routes/route');
// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

let attendanceRecords = [];

// Check if MONGO_URL is set correctly
if (!MONGO_URL) {
  console.error('MONGO_URL is not defined in your .env file');
  process.exit(1); // Exit the process with failure
}

app.use(express.json({ limit: '10mb' }));
app.use(cors());

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('NOT CONNECTED TO NETWORK', err));

app.use('/', Route);

app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
