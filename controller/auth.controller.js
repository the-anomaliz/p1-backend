import bcrypt from 'bcryptjs';
import passport from 'passport';
import passportConfig from '../config/passport.config.js';
import { User } from '../models/main.model.js';
import { generateTokens, refreshAccessTokens } from '../utils/token.util.js';
import { verifyAccessToken } from '../utils/auth.utils.js';
passportConfig(passport);

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'missing information', error: true });
    }
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return res.status(401).json({ message: 'unauthorized', error: true });
      }
      if (!user) {
        return res.status(401).json({ message: 'user not found', error: true });
      }
      req.logIn(user, async (error) => {
        if (error) {
          return res.status(401).json({ message: 'unauthorized', error: true });
        }
        const { accessToken, refreshToken, err } = generateTokens(user);
        if (err) return res.status(309).json({ message: 'unable to generate user tokens', error: true });
        const _id = user._id;
        await User.findByIdAndUpdate({ _id }, { lastLogin: +new Date() });
        return res.status(200).json({ message: 'found', error: false, accessToken, refreshToken });
      });
    })(req, res);
  } catch (error) {
    return res.status(401).json({ message: 'unauthorized', error: true });
  }
};

const Register = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: true, message: 'Incomplete information' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: true, message: 'passwords do not match' });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ error: true, message: 'user already exists' });
  }

  const newUser = new User({ fullName, email, password });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      newUser.password = hash;
      await newUser.save();
      // send email here
      return res.status(200).json({ message: 'Successfully Registered', error: false });
    });
  });
};

const RefreshToken = (req, res) => {
  try {
    const userInfo = res.locals.user;
    const { accessToken } = refreshAccessTokens(userInfo);
    return res.status(200).json({ message: 'token refreshed successfully', accessToken });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server error', error: true });
  }
};

const SendOneTimePassword = (req, res) => {
  // send email
};

const VerifyEmail = async (req, res) => {
  try {
    if (!req.header('Authorization') || !req.header('Authorization').split(' ')[1])
      return res.status(400).json({ message: 'bad request', error: true });
    const token = req.header('Authorization').split(' ')[1];
    const verifiedInfo = await verifyAccessToken(token);
    const { otp } = req.body;
    const { accessToken, refreshToken } = generateTokens(verifiedInfo);

    await User.findByIdAndUpdate(verifiedInfo._id, { emailVerified: true });
    res.json({ message: 'User email verified successfully', error: false, accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server error', error: true });
  }
};

const ActiveStatus = async (req, res) => {
  try {
    const { activeStatus, _id } = req.body;
    const activeSttausChangedBy = req.locals.user._id;

    await User.findByIdAndUpdate(_id, { isActive: activeStatus, activeSttausChangedBy });
    res.json({ message: 'User Activated Successfully', error: false });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server error', error: true });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { activeStatus, _id } = req.body;
    const verifiedBy = req.locals.user._id;
    await User.findByIdAndUpdate(_id, { isVerified: activeStatus, verifiedBy });
    res.json({ message: 'User Activated Successfully', error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: 'error while verifying user' });
  }
};

const blockUser = async (req, res) => {
  const { activeStatus, _id } = req.body;
  try {
    const blockedStatus = req.locals.user._id;
    await User.findByIdAndUpdate(_id, { isBlocked: activeStatus, blockedStatus });
    res.json({ message: `User ${activeStatus ? 'blocked' : 'unblocked'} successfully`, error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: `error while ${activeStatus ? 'blocking' : 'unblocking'} user` });
  }
};

export default { Login, Register, RefreshToken, ActiveStatus, VerifyEmail, SendOneTimePassword, verifyUser, blockUser };
