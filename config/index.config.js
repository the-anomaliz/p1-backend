import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

const config = {
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_ID: process.env.EMAIL_ID,
  CLIENT_URL: process.env.CLIENT_URL,
  MONGO_STRING: process.env.MONGO_STRING,
};

export default config;
