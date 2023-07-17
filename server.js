import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import config from './config/index.config.js';
import passportConfig from './config/passport.config.js';
import connectDb from './db/db.js';
import authRoutes from './routes/auth.routes.js';
import commonRoutes from './routes/common.routes.js';
passportConfig(passport);

const app = express();

connectDb();
app.set('PORT', process.argv[3] || config.PORT);

app.use([
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
  }),
  express.urlencoded({ extended: true }),
  express.json(),
]);

app.use(
  session({
    name: 'session',
    secret: config.SECRET,
    resave: true,
    saveUninitialized: false,
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', commonRoutes);
app.use('/auth', authRoutes);
app.all('*', (req, res) => {
  res.status(400).json({ error: true, message: 'bad request' });
});

app.listen(app.get('PORT'), () => {
  console.log(`Server is running at http://localhost:${config.PORT}`);
});
