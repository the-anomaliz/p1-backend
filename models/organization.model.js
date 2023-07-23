import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default new Schema(
  {
    createBy: { type: String, required: true },
    profile: { type: String },
    fullName: { type: String, required: true, trim: true },
    country: { type: String, required: true },
    recognized: String,
    about: String,
    marketRecognitions: String,
    practiceAreas: { type: Object },
    expertise: { type: Object },
    branches: { type: String },
    type: { type: String, default: 'company' },
    socialLinks: { type: Object },
    contact: {
      phone: String, // with country code like +91 000000000
      email: String,
      website: String,
      address: String,
    },
    accreditation: {
      awards: [],
      surveys: [],
      rankings: [],
    },
    keyContacts: {
      type: [
        {
          name: String,
          position: String,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
