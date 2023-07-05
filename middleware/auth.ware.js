import jwt from 'jsonwebtoken';
import config from '../config/index.config.js';

const validateAccesstoken = async (req, res, next) => {
  try {
    if (!req.header('Authorization') || !req.header('Authorization').split(' ')[1])
      return res.status(400).json({ success: false, message: 'bad request', error: true });
    const token = req.header('Authorization').split(' ')[1].trim();
    const decodedUserInfo = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    jwt.verify(token, config.ACCESS_TOKEN, (err) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          console.log(err);
          return res.status(401).json({ success: false, message: 'token expired', error: true });
        } else {
          return res.status(401).json({ success: false, message: 'unauthorized', error: true });
        }
      }

      if (!decodedUserInfo.emailVerified) {
        return res.status(401).json({ success: false, message: 'user email not verified', error: true });
      } else if (!decodedUserInfo.isActive) {
        return res.status(401).json({ success: false, message: 'user is not active', error: true });
      }

      console.log(decodedUserInfo._id);
      res.locals.user = decodedUserInfo;
      return next();
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: 'unauthorized', error: true });
  }
};

const validateRefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const decodedUserInfo = JSON.parse(Buffer.from(refreshToken.split('.')[1], 'base64').toString());
    jwt.verify(refreshToken, config.REFRESH_TOKEN, (err) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          console.log(err);
          return res.status(401).json({ success: false, message: 'token expired', error: true });
        } else {
          return res.status(401).json({ success: false, message: 'unauthorized', error: true });
        }
      }
      res.locals.user = decodedUserInfo;
      return next();
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: 'unauthorized', error: true });
  }
};

export { validateAccesstoken, validateRefreshToken };
