import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Clubs } from '../../api/club/Club.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

const addClub = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Clubs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}
// Initialize the ClubsCollection if empty.
if (Clubs.collection.find().count() === 0) {
  if (Meteor.settings.defaultClub) {
    console.log('Creating default data.');
    Meteor.settings.defaultClub.forEach(data => addClub(data));
  }
}
