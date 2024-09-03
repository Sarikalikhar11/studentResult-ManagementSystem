import express from 'express'
import cors from 'cors'
import databaseConfig from './configs/databaseConfig.js';
import { sendMessage } from './microservice/textSms.js';
import studentRouter from './router/studentRouter.js';

const app = express();

const port = 3000;

databaseConfig();
sendMessage();


const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200,
};  

app.use(cors(corsOptions));
app.use(express.json());

//Path Routes   
app.use('/api/v1/student', studentRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

