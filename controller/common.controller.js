import User from '../models/user.model.js';

const Home = (req, res) => {
  res.send('<center><h1>Welcome!</h1></center>');
};

const UserInfo = async (req, res) => {
  try {
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
    res.status(200).json({ data, totalUser, activeUsers, deactivedUsers, verifedUsers, unverifiedUsers });
  } catch (error) {
    res.status(500).json({ succes: false, error: true, msg: 'error while fetching user info' });
  }
};

export { Home, UserInfo };
