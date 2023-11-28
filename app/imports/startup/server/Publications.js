import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Clubs } from '../../api/club/Club';
import { Events } from '../../api/events/Events';
import { Profiles } from '../../api/profiles/Profiles';
import { Interests } from '../../api/interests/Interests';
import { ClubInterests } from '../../api/club/ClubInterests';
import { EventsInterests } from '../../api/events/EventsInterests';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesClub } from '../../api/profiles/ProfilesClub'; // Import ProfilesClub collection
import { ProfileClubs } from '../../api/profile/ProfileClubs';
import { ProfilesEvents } from '../../api/profiles/ProfilesEvents'; // Import ProfilesEvents collection
import { ClubEvents } from '../../api/club/ClubEvents'; // Import ClubEvents collection

// User-level publications for Clubs
Meteor.publish(Clubs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Clubs.collection.find();
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

// Publication for all Clubs
Meteor.publish('clubs.all', function () {
  return Clubs.collection.find();
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

// General publication for ProfilesClub
Meteor.publish(ProfilesClub.publicationName, function () {
  return ProfilesClub.collection.find();
});

// General publication for ProfilesEvents
Meteor.publish(ProfilesEvents.publicationName, function () {
  return ProfilesEvents.collection.find();
});

// General publication for ClubEvents
Meteor.publish(ClubEvents.publicationName, function () {
  return ClubEvents.collection.find();
});

// Roles publication
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish(ProfileClubs.userPublicationName, function () {
  if (this.userId) {
    const profileClubs = ProfileClubs.collection.find({ userId: this.userId }).fetch();
    const clubIds = profileClubs.map(pc => pc.clubId);
    console.log('Club IDs:', clubIds); // Log the club IDs

    const clubs = Clubs.collection.find({ _id: { $in: clubIds } }).fetch();
    console.log('Clubs found:', clubs); // Log the found clubs

    // Return the cursor, not the fetched array
    return Clubs.collection.find({ _id: { $in: clubIds } });
  }
  return this.ready();
});
