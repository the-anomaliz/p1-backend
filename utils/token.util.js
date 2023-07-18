import jwt from 'jsonwebtoken';
import config from '../config/index.config.js';

const generateTokens = (user) => {
  try {
    const accessToken = jwt.sign(user, config.ACCESS_TOKEN, { expiresIn: '7d' });
    const refreshToken = jwt.sign(user, config.REFRESH_TOKEN, { expiresIn: '30d' });
    return { accessToken, refreshToken };
  } catch (err) {
    return err;
  }
};

const refreshAccessTokens = (user) => {
  try {
    const accessToken = jwt.sign(user, config.ACCESS_TOKEN, { expiresIn: '1h' });
    return { accessToken };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { generateTokens, refreshAccessTokens };
