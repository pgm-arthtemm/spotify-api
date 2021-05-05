/* eslint-disable radix */
// imports
import faker from 'faker';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import UserDb from '../lib/UserDb.js';

// init dotenv
dotenv.config();

// init user database
const userDB = new UserDb();

const createUsers = (amount) => {
  const usersPlain = [];
  const users = [];
  let amountDepartments = 0;
  // as long as the amount of departments doesn't meet the given amount, keep on faking.
  while (amountDepartments < amount) {
    // create new user
    // eslint-disable-next-line radix
    // eslint-disable-next-line max-len
    const hashedPwd = bcrypt.hashSync(faker.internet.password(), parseInt(process.env.BCRYPT_SALT_ROUNDS));

    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      is_admin: 0,
      password: hashedPwd,
    };

    // check if unique
    if (usersPlain.indexOf(user.username) < 0) {
      usersPlain.push(user.username);
      users.push(user);
      // eslint-disable-next-line no-plusplus
      amountDepartments++;
    }
  }

  // return the given amount of users
  return users;
};

const seedUsersDb = (users) => {
  const ids = users.map(async (user) => {
    const id = await userDB.addSeeds(user);
    return id;
  });

  return Promise.all(ids);
};

const seed = async () => {
  const users = createUsers(50);
  console.log(`Created ${users.length} users`);
  console.log(users);
  const ids = await seedUsersDb(users);
  console.log(ids);
  console.log('Users added to database');
};

seed();
