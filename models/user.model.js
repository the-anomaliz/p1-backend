import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default new Schema(
  {
    fullName: { type: String, required: true, trim: true, minlength: 3, maxlength: 20 },
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      validate: (email) => {
        return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
      },
    },
    password: { type: String },
    role: {
      type: String,
      enum: ['l0', 'l1', 'l2', 'l3'], //l0 super admin | l1 admin | l2 company | l3 user
      default: 'l3',
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
      company_id: String, // company id to connect with _id from another DB
      name: String,
      address: String,
      website: String,
      recongisedFor: String,
    },
    address: {
      house: { type: String },
      district: { type: String },
      pincode: { type: Number },
      state: { type: String },
      country: { type: String },
    },
    about: {
      type: String,
    },
    currentStatus: {
      type: String,
    },
    dealsMatters: {
      type: String,
    },
    educationHistory: [{ type: Schema.Types.ObjectId, ref: 'address' }], // separate collections
    skills: {
      type: Array,
    },
    feedbacks: [{ type: Schema.Types.ObjectId, ref: 'address' }],
    languages: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
