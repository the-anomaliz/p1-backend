import jwt from 'jsonwebtoken';
import USER from '../models/user.model';
import bcrypt from 'bcrypt';
import config from '../config/index.js';

const ensureAuthenticated = async (req, res, next) => {
  try {
    const User = await USER.findOne({ email: req.body.email });
    if (req.params.id.toString() === User._id.toString() && bcrypt.compareSync(req.body.password, User.password)) {
      const tokenLength = User.token.length;
      jwt.verify(User.token[tokenLength - 1], config.ACCESS_TOKEN, (err) => {
        if (err) {
          return res.status(401).json({ success: false, message: 'unauthorized', error: true });
        }
        res.locals.isAuthenticated = true;
        res.locals.user = User;
      });
      return next();
    }
    res.locals.isAuthenticated = false;
    return res.status(401).json({ success: false, message: 'unauthorized', error: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: 'unauthorized', error: true });
  }
};

export default ensureAuthenticated;
