import bcrypt from 'bcryptjs';
import passport from 'passport';
import passportConfig from '../config/passport.config.js';
import User from '../models/user.model.js';
import { generateTokens, refreshAccessTokens } from '../utils/token.util.js';
passportConfig(passport);

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'missing information', error: true });
    }
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return res.status(401).json({ success: false, message: 'unauthorized', error: true });
      }
      if (!user) {
        return res.status(401).json({ success: false, message: 'user not found', error: true });
      }
      req.logIn(user, async (error) => {
        if (error) {
          return res.status(401).json({ success: false, message: 'unauthorized', error: true });
        }
        const { accessToken, refreshToken, err } = generateTokens(user.toObject());
        if (err)
          return res.status(309).json({ success: false, message: 'unable to generate user tokens', error: true });
        const _id = user.toObject()._id;
        await User.findByIdAndUpdate({ _id }, { lastLogin: +new Date() });
        return res.status(200).json({ success: true, message: 'found', error: false, accessToken, refreshToken });
      });
    })(req, res);
  } catch (error) {
    return res.status(401).json({ success: false, message: 'unauthorized', error: true });
  }
};

const Register = async (req, res) => {
  const { full_name, email, password, confirm_password } = req.body;

  if (!full_name || !email || !password || !confirm_password) {
    return res.status(400).json({ error: true, message: 'Incomplete information', success: false });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ error: true, message: 'passwords do not match', success: false });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ error: true, message: 'user already exists', success: false });
  }

  const newUser = new User({ full_name, email, password });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      newUser.password = hash;
      await newUser.save();
    });
  });

  // send email here
  return res.status(200).json({ success: true, message: 'Successfully Registered', error: false });
};

const RefreshToken = (req, res) => {
  try {
    const userInfo = res.locals.user;
    const { accessToken } = refreshAccessTokens(userInfo);
    return res.status(200).json({ success: true, message: 'token refreshed successfully', accessToken });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server error', error: true });
  }
};

const SendOneTimePassword = (req, res) => {
  // send email
};

const VerifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = res.locals.user;

    await User.findByIdAndUpdate(_id, { emailVerified: true });
    res.json({ success: true, message: 'User email verified successfully', error: false });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server error', error: true });
  }
};

const ActiveStatus = async (req, res) => {
  try {
    const { activeStatus } = req.body;
    await User.findByIdAndUpdate(_id, { isActive: activeStatus });
    res.json({ success: true, message: 'User Activated Successfully', error: false });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server error', error: true });
  }
};

export default { Login, Register, RefreshToken, ActiveStatus, VerifyEmail, SendOneTimePassword };
