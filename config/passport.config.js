import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';

//User model
import { User } from '../models/main.model.js';

// Passport function
export default function (passport) {
  passport.use(
    'local',
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email })
        .lean()
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'Email not registered' });
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((err, user) => {
        done(err, user);
      });
  });
}
