import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Clubs } from '../../api/club/Club';
import { Events } from '../../api/events/Events';
import { ProfileClubs } from '../../api/profile/ProfileClubs';
// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Clubs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Clubs.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(Clubs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Clubs.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish(Events.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Events.collection.find({ createdBy: username });
  }
  return this.ready();
});

Meteor.publish(Events.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Events.collection.find();
  }
  return this.ready();
});

Meteor.publish(ProfileClubs.userPublicationName, function () {
  if (this.userId) {
    const profileClubs = ProfileClubs.collection.find({ userId: this.userId }).fetch();
    const clubIds = profileClubs.map(pc => pc.clubId);
    console.log("Club IDs:", clubIds);  // Log the club IDs

    const clubs = Clubs.collection.find({ _id: { $in: clubIds } }).fetch();
    console.log("Clubs found:", clubs); // Log the found clubs

    // Return the cursor, not the fetched array
    return Clubs.collection.find({ _id: { $in: clubIds } });
  }
  return this.ready();
});