import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Clubs } from '../../api/club/Club.js';
import { Events } from '../../api/events/Events';
import { Profiles } from '../../api/profile/Profile.js'; // Import Profiles collection
import { Interests } from '../../api/interest/Interest.js'; // Import Interests collection
import { ClubInterests } from '../../api/clubInterest/ClubInterest.js'; // Import ClubInterests collection
import { EventsInterests } from '../../api/eventInterest/EventInterest.js'; // Import EventsInterests collection
import { ProfilesInterests } from '../../api/profileInterest/ProfileInterest.js'; // Import ProfilesInterests collection

/* eslint-disable no-console */

// Function to add default data to Stuffs
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

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

// Function to add default data to ClubInterests
const addClubInterests = (data) => {
  console.log(`  Adding club interest: ${data.clubId} - ${data.interestId}`);
  ClubInterests.collection.insert(data);
};

// Function to add default data to EventsInterests
const addEventsInterests = (data) => {
  console.log(`  Adding event interest: ${data.eventId} - ${data.interestId}`);
  EventsInterests.collection.insert(data);
};

// Function to add default data to ProfilesInterests
const addProfilesInterests = (data) => {
  console.log(`  Adding profile interest: ${data.profileId} - ${data.interestId}`);
  ProfilesInterests.collection.insert(data);
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
initializeCollection(Stuffs.collection, Meteor.settings.defaultData, addData);
initializeCollection(Clubs.collection, Meteor.settings.defaultClub, addClub);
initializeCollection(Events.collection, Meteor.settings.defaultEvent, addEvents);
initializeCollection(Profiles.collection, Meteor.settings.defaultProfile, addProfiles);
initializeCollection(Interests.collection, Meteor.settings.defaultInterest, addInterests);
initializeCollection(ClubInterests.collection, Meteor.settings.defaultClubInterest, addClubInterests);
initializeCollection(EventsInterests.collection, Meteor.settings.defaultEventInterest, addEventsInterests);
initializeCollection(ProfilesInterests.collection, Meteor.settings.defaultProfileInterest, addProfilesInterests);
