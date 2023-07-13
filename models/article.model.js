import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default new Schema({
  uid: { type: String, required: true },
  heading: { type: String, required: true },
  content: { type: String, required: true },
  tags: [],
});
