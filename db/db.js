import mongoose from 'mongoose';

const connectDb = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/p1-db');
};

connectDb()
  .then(() => {
    console.log('Database connected seamlessly :)');
  })
  .catch(err => console.log(err));

export default connectDb;
