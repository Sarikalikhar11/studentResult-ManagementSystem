import twilio from "twilio";

// Load environment variables from a .env file if present
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from environment variables
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from environment variables
const client = twilio(accountSid, authToken);

export const sendMessage = async () => {
    try {
        const message = await client.messages.create({
            body: 'Hello from schoolLy',
            from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number from environment variables
            to: '+919370294078' // Recipient's phone number
        });
        console.log(message.sid);
    } catch (error) {
        console.error(error);
    }
};