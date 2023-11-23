import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Clubs } from '../../api/club/Club';
import { Events } from '../../api/events/Events';
import { Profiles } from '../../api/profile/Profile'; // Import Profiles collection
import { Interests } from '../../api/interest/Interest'; // Import Interests collection
import { ClubInterests } from '../../api/clubInterest/ClubInterest'; // Import ClubInterests collection
import { EventsInterests } from '../../api/eventInterest/EventInterest'; // Import EventsInterests collection
import { ProfilesInterests } from '../../api/profileInterest/ProfileInterest'; // Import ProfilesInterests collection

// User-level publications for Stuffs
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publications for Stuffs
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

// User-level publications for Clubs
Meteor.publish(Clubs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Clubs.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publications for Clubs
Meteor.publish(Clubs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Clubs.collection.find();
  }
  return this.ready();
});

// User-level publications for Events
Meteor.publish(Events.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Events.collection.find({ createdBy: username });
  }
  return this.ready();
});

// Admin-level publications for Events
Meteor.publish(Events.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Events.collection.find();
  }
  return this.ready();
});

// User-level publications for Profiles
Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    return Profiles.collection.find({ userId: this.userId });
  }
  return this.ready();
});

// Admin-level publications for Profiles
Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Profiles.collection.find();
  }
  return this.ready();
});

// General publication for Interests
Meteor.publish(Interests.publicationName, function () {
  return Interests.collection.find();
});

// General publication for ClubInterests
Meteor.publish(ClubInterests.publicationName, function () {
  return ClubInterests.collection.find();
});

// General publication for EventsInterests
Meteor.publish(EventsInterests.publicationName, function () {
  return EventsInterests.collection.find();
});

// General publication for ProfilesInterests
Meteor.publish(ProfilesInterests.publicationName, function () {
  return ProfilesInterests.collection.find();
});

// Roles publication
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
