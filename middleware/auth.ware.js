import { User } from '../models/main.model.js';
import { verifyAccessToken, verifyRefreshToken } from '../utils/auth.utils.js';

//auth util verify token
const validateAccesstoken = async (req, res, next) => {
  try {
    if (!req.header('Authorization') || !req.header('Authorization').split(' ')[1])
      return res.status(400).json({ message: 'bad request', error: true });
    const token = req.header('Authorization').split(' ')[1].trim();
    const decodedInfo = await verifyAccessToken(token);
    const user = await User.findById(decodedInfo.id).lean()
    if (!user.emailVerified) {
      return res.status(401).json({ success: false, message: 'user email not verified', error: true });
    } else if (!user.isActive) {
      return res.status(401).json({ success: false, message: 'user is not active', error: true });
    }

    res.locals.user = decodedInfo;
    return next();
  } catch (err) {
    return res.status(500).json({ message: 'internal server error', error: true });
  }
};

// auth util verify token
const validateRefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const decodedInfo = await verifyRefreshToken(refreshToken);
    res.locals.user = decodedInfo;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'unauthorized', error: true });
  }
};

export { validateAccesstoken, validateRefreshToken };
