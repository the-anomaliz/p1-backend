import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default new Schema(
  {
    createBy: { type: String, required: true },
    fullName: { type: String, required: true, trim: true },
    address: { country: { type: String, required: true } },
    mobile: { type: String, required: true }, // with country code like +91 000000000
    website: String,
    recongized: String,
    about: String,
    marketRecognitions: String,
    particeAreas: {
      type: Object,
    },
    expertise: {
      type: Object,
    },
    branches: {
      type: String,
    },
    articles: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
