import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

const config = {
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
};

export default config;
