import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['l0', 'l1', 'l2'], //l0 super admin | l1 admin | l2 company | l3 user
      default: 'l2',
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Number,
    },
    jobTitle: {
      type: String,
    },
    company: {
      name: String,
      address: String,
      website: String,
    },
    address: {
      house: String,
      state: String,
      district: String,
      pincode: Number,
      country: String,
    },
    aboutme: {
      // can be separated in other collection
      type: String,
    },
    currentStatus: {
      type: String,
    },
    articles: {
      // should be separated in other collection
      type: String,
    },
    dealsMatters: {
      type: String,
    },
    experience: {
      // can be separated in other collection
      type: Object,
    },
    educationHistory: [{}],
    skills: {
      type: Object,
    },
    feedbacks: {
      type: String,
    },
    languages: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);
