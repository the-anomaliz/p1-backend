import jwt from 'jsonwebtoken';
import config from '../config/index.config.js';

// verify access token
const verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    const decodedUserInfo = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

    jwt.verify(token, config.ACCESS_TOKEN, (err) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          console.log(err);
          return reject();
          return res.status(401).json({ message: 'token expired', error: true });
        } else {
          return reject();
          return res.status(401).json({ message: 'unauthorized', error: true });
        }
      }

      return resolve(decodedUserInfo);
    });
  });
};

// verify refresh token
const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    const decodedUserInfo = JSON.parse(Buffer.from(refreshToken.split('.')[1], 'base64').toString());
    jwt.verify(refreshToken, config.REFRESH_TOKEN, (err) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          console.log(err);
          return reject();
          return res.status(401).json({ message: 'token expired', error: true });
        } else {
          return reject();
          return res.status(401).json({ message: 'unauthorized', error: true });
        }
      }
      return next(decodedUserInfo);
    });
  });
};

export { verifyAccessToken, verifyRefreshToken };
