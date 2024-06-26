import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

const createUser = (username, email, password, role) => {
  console.log(`  Creating user ${email}.`);

  // Check if there's already a user with the same username (case-sensitive)
  const existingUser = Meteor.users.findOne({ username: { $regex: `^${username}$`, $options: 'i' } });
  if (existingUser) {
    throw new Error('Username is already taken.');
  }

  const userID = Accounts.createUser({
    username: username,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
};

// Allow users to update their username

// functionality to edit the username and nothing else of a user

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ username, email, password, role }) => createUser(username, email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
