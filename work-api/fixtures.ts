import mongoose from 'mongoose';
import config from './config';
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');

  } catch (e) {
    console.log('Skipping drop...');
  }

  await User.create({
    username: "User",
    password: "123",
    token: crypto.randomUUID(),
    role: "user"
  }, {
    username: "Admin",
    password: "321",
    token: crypto.randomUUID(),
    role: "admin"
  });


  await db.close();
};

run().catch(console.error);