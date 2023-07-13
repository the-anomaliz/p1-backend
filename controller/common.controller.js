import { User } from '../models/main.model.js';

const Home = (req, res) => {
  res.send('<center><h1>Welcome!</h1></center>');
};

const UserInfo = async (req, res) => {
  try {
    const statsType = req.query.stats;
    const data = await User.find();
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
    const uid = res.locals.user._id;
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
    const uid = res.locals.user._id;
    const userData = req.body;
    const userInfo = await User.findOneAndUpdate({ _id: uid }, userData, { new: true });
    res.json({ error: true, data: userInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: 'error while updating user info' });
  }
};

export default { Home, UserInfo, FetchProfileInfo, UpdateProfileInfo };
