import mongoose from 'mongoose';
import config from '../config/index.config.js';

const connectDb = async () => {
  await mongoose.connect(config.MONGO_STRING);
};

connectDb()
  .then(() => {
    console.log('Database connected seamlessly :)');
  })
  .catch((err) => console.log(err));

export default connectDb;
