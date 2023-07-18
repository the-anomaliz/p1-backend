import jwt from 'jsonwebtoken';
import config from '../config/index.config.js';

const generateTokens = (user) => {
  try {
    const accessToken = jwt.sign({ id: user._id }, config.ACCESS_TOKEN, { expiresIn: '7d' });
    const refreshToken = jwt.sign({ id: user._id }, config.REFRESH_TOKEN, { expiresIn: '30d' });
    return { accessToken, refreshToken };
  } catch (err) {
    return err;
  }
};

const refreshAccessTokens = (user) => {
  try {
    const accessToken = jwt.sign({ id: user.id }, config.ACCESS_TOKEN, { expiresIn: '1h' });
    return { accessToken };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { generateTokens, refreshAccessTokens };
