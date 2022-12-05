// sources in blogpostSeeds.json:

// https://www.pcmag.com/news/yes-doom-is-playable-on-a-pregnancy-test
// https://www.lambdatest.com/blog/top-javascript-frameworks-for-2019/
// https://www.ibm.com/topics/cybersecurity

const sequelize = require('../config/connection');
const { User, Blogpost, Comment } = require('../models');

const userData = require('./userData.json');
const blogpostData = require('./blogpostSeeds.json');
const commentData = require('./commentSeeds.json');

const seedDB = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  })
  for (const blogpost of blogpostData) {
    await Blogpost.create({
      ...blogpost,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
}
  for (const comment of commentData) {
  await Comment.create({
    ...comment,
    user_id: userData[Math.floor(Math.random() * userData.length)].id,
  })

  process.exit(0);
};

seedDB();
