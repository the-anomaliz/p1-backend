import { Article, Org, User } from '../models/main.model.js';

const Home = (req, res) => {
  res.send('<center><h1>Welcome!</h1></center>');
};

const UserInfo = async (req, res) => {
  try {
    const statsType = req.query.stats;
    const data = await User.find().select({ password: 0 }).lean();
    const totalUser = data.length;
    let activeUsers = 0;
    let deactivedUsers = 0;
    let verifedUsers = 0;
    let unverifiedUsers = 0;
    for (const [key, value] of Object.entries(data)) {
      value.isActive ? activeUsers++ : deactivedUsers++;
      value.isVerified ? verifedUsers++ : unverifiedUsers++;
    }
    let finalRes = { totalUser, activeUsers, deactivedUsers, verifedUsers, unverifiedUsers };
    if (statsType !== 'true') finalRes = { ...finalRes, data };
    res.status(200).json({ error: false, data: finalRes });
  } catch (error) {
    res.status(500).json({ error: true, msg: 'error while fetching user info' });
  }
};

const FetchProfileInfo = async (req, res) => {
  try {
    const uid = res.locals.user.id;
    let userInfo = await User.findById(uid).lean();
    delete userInfo.password; // check why this is not working
    res.json({ error: false, data: userInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: 'error while fetching user info' });
  }
};

const UpdateProfileInfo = async (req, res) => {
  try {
    const uid = res.locals.user.id;
    const userData = req.body;
    if (!userData) return res.status(400).json({ error: true, msg: 'req body cannot be empty' });
    const userInfo = await User.findOneAndUpdate({ _id: uid }, userData, { new: true });
    res.json({ error: false, data: userInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: 'error while updating user info' });
  }
};

const createOrganisation = async (req, res) => {
  try {
    const uid = res.locals.user.id;
    const orgData = req.body;
    if (!orgData) return res.status(400).json({ error: true, msg: 'req body cannot be empty' });

    const orginfo = await Org.findOne({ fullName: orgData?.fullName });
    if (orginfo) return res.status(401).json({ error: true, msg: 'organisation already exists' });

    const newOrg = new Org({ ...orgData, createBy: uid });
    await newOrg.save();

    res.json({ error: false, data: newOrg });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: 'error while updating user info' });
  }
};

const createPost = async (req, res) => {
  try {
    const uid = res.locals.user.id;
    const { heading, content, tags } = req.body;
    if (!heading || !content) return res.status(400).json({ error: true, msg: 'req body cannot be empty' });

    const newPost = new Article({ ...req.body, uid });
    await newPost.save();

    res.json({ error: false, msg: 'Article Stored successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: 'error while updating user info' });
  }
};

const fetchPosts = async (req, res) => {
  try {
    const uid = res.locals.user.id;
    const articles = await Article.find({ uid });

    res.json({ error: false, data: articles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: 'error while updating user info' });
  }
};

const fetchUserPosts = async (req, res) => {
  try {
    const { uid } = req.params;
    const articles = await Article.find({ uid });

    res.json({ error: false, data: articles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: 'error while updating user info' });
  }
};

const fetchPostsByTag = async (req, res) => {
  try {
    const uid = res.locals.user.id;
    const tagName = req.body.tag;
    if (!tagName) return res.status(400).json({ error: true, msg: 'req body cannot be empty' });
    const articles = await Article.find({ tags: tagName });

    res.json({ error: false, data: articles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: 'error while updating user info' });
  }
};

export default {
  Home,
  UserInfo,
  FetchProfileInfo,
  UpdateProfileInfo,
  createOrganisation,
  createPost,
  fetchPosts,
  fetchUserPosts,
  fetchPostsByTag,
};
