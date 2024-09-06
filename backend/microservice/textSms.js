// Load environment variables from a .env file if present
import dotenv from 'dotenv';
dotenv.config();

import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from environment variables
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from environment variables
const client = twilio(accountSid, authToken); // Initialize Twilio client

export const sendMessage = async () => {
  try {
    // Check if credentials are correctly loaded
    console.log('TWILIO_ACCOUNT_SID:', accountSid);
    console.log('TWILIO_AUTH_TOKEN:', authToken);
    console.log('TWILIO_PHONE_NUMBER:', process.env.TWILIO_PHONE_NUMBER);

    const message = await client.messages.create({
      body: 'Hello from schoolLy',
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number from environment variables
      to: '+919370294078', // Recipient's phone number
    });
    console.log('Message SID:', message.sid);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};
