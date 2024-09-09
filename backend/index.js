const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Routes = require('./routes/route.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Body parser is now built into express
app.use(express.json({ limit: '10mb' }));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

app.use('/', Routes);

app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
