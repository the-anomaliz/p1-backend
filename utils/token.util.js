import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const generateTokens = (user) => {
  try {
    const payload = { _id: user._id, roles: user.roles };
    const accessToken = jwt.sign(payload, config.ACCESS_TOKEN, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN, { expiresIn: '1d' });

    return { accessToken, refreshToken };
  } catch (err) {
    return { err };
  }
};

export default generateTokens;
