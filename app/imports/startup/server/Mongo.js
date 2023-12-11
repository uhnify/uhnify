import { Meteor } from 'meteor/meteor';
import { Clubs } from '../../api/club/Club.js';
import { Events } from '../../api/events/Events';
import { Profiles } from '../../api/profiles/Profiles.js'; // Import Profiles collection
import { Interests } from '../../api/interests/Interests.js'; // Import Interests collection

/* eslint-disable no-console */

// Uncomment or remove if you are not using addData
// Function to add default data to Stuffs
// const addData = (data) => {
//  console.log(`  Adding: ${data.name} (${data.owner})`);
//  Stuffs.collection.insert(data);
// };

// Function to add default data to Clubs
const addClub = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Clubs.collection.insert(data);
};

// Function to add default data to Events
const addEvents = (data) => {
  console.log(`  Adding: ${data.title} (${data.description})`);
  Events.collection.insert(data);
};

// Function to add default data to Profiles
const addProfiles = (data) => {
  console.log(`  Adding profile: ${data.name}`);
  Profiles.collection.insert(data);
};

// Function to add default data to Interests
const addInterests = (data) => {
  console.log(`  Adding interest: ${data.name}`);
  Interests.collection.insert(data);
};

// Initialize the collections if empty and if default data is provided in settings
const initializeCollection = (collection, defaultData, addFunction) => {
  if (collection.find().count() === 0) {
    if (defaultData) {
      console.log(`Creating default data for ${collection._name}.`);
      defaultData.forEach(data => addFunction(data));
    }
  }
};

// Call the initialize function for each collection
initializeCollection(Clubs.collection, Meteor.settings.defaultClub, addClub);
initializeCollection(Events.collection, Meteor.settings.defaultEvent, addEvents);
initializeCollection(Profiles.collection, Meteor.settings.defaultProfile, addProfiles);
initializeCollection(Interests.collection, Meteor.settings.defaultInterest, addInterests);
