import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from './models/Post';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('posts');
    await db.dropCollection('users');

  } catch (e) {
    console.log('Skipping drop...');
  }

  const [user, admin] = await User.create({
    username: "User",
    password: "123",
    token: crypto.randomUUID(),
    role: "user",
    displayName: 'User',
  }, {
    username: "Admin",
    password: "321",
    token: crypto.randomUUID(),
    role: "admin",
    displayName: 'Admin',
  });

  await Post.create(
    {
      username: user.displayName,
      userId: user._id,
      image: 'fixtures/image-1',
      title: 'Горы',
    },{
      username: user.displayName,
      userId: user._id,
      image: 'fixtures/image-2',
      title: 'Озеро',
    },{
      username: admin.displayName,
      userId: admin._id,
      image: 'fixtures/image-3',
      title: 'Пустыня',
    });

  await db.close();
};

run().catch(console.error);