import mongoose from 'mongoose';

import articleSchema from './article.model.js';
import educationSchema from './education.model.js';
import experienceSchema from './experience.model.js';
import userSchema from './user.model.js';
import orgSchema from './organization.model.js';

const Article = mongoose.model('Article', articleSchema);
const Education = mongoose.model('Education', educationSchema);
const Experience = mongoose.model('Experience', experienceSchema);
const User = mongoose.model('User', userSchema);
const Org = mongoose.model('Organization', orgSchema);

export { Article, Education, Experience, User, Org };
