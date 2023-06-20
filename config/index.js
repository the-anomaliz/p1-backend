import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

const config = {
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
};

export default config;
