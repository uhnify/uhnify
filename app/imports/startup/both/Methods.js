import { Meteor } from 'meteor/meteor';
import { ProfileClubs } from '../../api/profile/ProfileClubs';

Meteor.methods({
  'profileClubs.add'(clubId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // Check if the club already exists for the user
    const exists = ProfileClubs.collection.findOne({ userId: this.userId, clubId: clubId });

    // If it doesn't exist, insert it
    if (!exists) {
      ProfileClubs.collection.insert({
        userId: this.userId,
        clubId: clubId,
      });
    }
    else
    {
      console.log("already exists");
    }
  },
});