import bcrypt from 'bcryptjs';
import passport from 'passport';
import passportConfig from '../config/passport.js';
import User from '../models/user.model.js';
passportConfig(passport);

const Login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'missing information',
        error: true,
      });
    }

    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/',
      failureFlash: false,
    })(req, res, next);
  } catch (error) {
    console.log(error);
  }
};

const Register = async (req, res, next) => {
  const { full_name, email, password, confirm_password } = req.body;

  if (!full_name || !email || !password || !confirm_password) {
    return res.status(400).json({
      error: true,
      message: 'Incomplete information',
      success: false,
    });
  }

  if (password !== confirm_password) {
    return res.status(400).json({
      error: true,
      message: 'passwords do not match',
      success: false,
    });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      error: true,
      message: 'user already exists',
      success: false,
    });
  }

  const secretToken = 'jqnwdouqdouno';
  const newUser = new User({ full_name, email, password, secretToken });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      newUser.password = hash;
      await newUser.save();
    });
  });

  const { secretToken: token, ...sanitizedUser } = newUser.toObject();

  // send email here
  return res.status(200).json({
    success: true,
    message: 'Successfully Registered',
    user: sanitizedUser,
  });
};

export { Login, Register };
