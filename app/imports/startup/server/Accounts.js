import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '/imports/api/profiles/Profiles'; // Adjust the import path as needed

/* eslint-disable no-console */

// Function to generate a UH_ID for a new profile
// Modify this function according to how you generate UH_IDs
const generateUH_ID = () => {
  // Example: Generate a random UH_ID. Adjust this to your requirements.
  const min = 22400000;
  const max = 22499999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to create a profile for the new user
const createUserProfile = (userId, email, firstName, lastName) => {
  const UH_ID = generateUH_ID();
  Profiles.collection.insert({
    //UH_ID,
    userId,
    email,
    // Set other fields to default values or leave them to be updated later
    firstName: firstName,
    lastName: lastName,
    bio: '',
    title: '',
    picture: '/images/default-profile.png', // Default profile picture
  });
  console.log(`  Profile created for user ID ${userId} with UH_ID ${UH_ID}.`);
};

// Function to create a user account
const createUser = (email, password, role) => {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });

  // Create a corresponding profile for the user
  createUserProfile(userID, email);

  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
};

// Initialize the database with default users
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ email, password, role }) => {
      createUser(email, password, role);
    });
  } else {
    console.log('Cannot initialize the database! Please invoke meteor with a settings file.');
  }
}



