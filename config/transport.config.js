import nodemailer from 'nodemailer';
import config from './index.config.js';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.EMAIL_PASS,
    pass: config.EMAIL_ID,
  },
});

export default transporter;
