import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default new Schema({
  uid: { type: String, required: true },
  experience: {
    type: String,
  },
});
