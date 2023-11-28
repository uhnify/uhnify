import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Clubs } from '../../api/club/Club';
import { Events } from '../../api/events/Events';
import { Profiles } from '../../api/profiles/Profiles';
import { ClubInterests } from '../../api/club/ClubInterests';
import { EventsInterests } from '../../api/events/EventsInterests';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesClub } from '../../api/profiles/ProfilesClub';
import { ProfileClubs } from '../../api/profile/ProfileClubs';
import { ProfilesEvents } from '../../api/profiles/ProfilesEvents';
import { ClubEvents } from '../../api/club/ClubEvents';

const updateProfileMethod = 'Profiles.update';

Meteor.methods({
  'Profiles.update'({ UH_ID, email, firstName, lastName, bio, title, picture, interests }) {
    Profiles.collection.update({ UH_ID }, { $set: { email, firstName, lastName, bio, title, picture } });
    ProfilesInterests.collection.remove({ profile: UH_ID });
    interests.forEach((interest) => ProfilesInterests.collection.insert({ profile: UH_ID, interest }));
  },
  'Profiles.joinClub'({ UH_ID, clubID }) {
    ProfilesClub.collection.insert({ profileId: UH_ID, clubId: clubID });
  },
  'Profiles.attendEvent'({ UH_ID, eventID }) {
    ProfilesEvents.collection.insert({ profileId: UH_ID, eventId: eventID });
  },
});

const addClubMethod = 'Clubs.add';

Meteor.methods({
  'Clubs.add'({ name, description, location, image, meetingTime, contactInfo, categories }) {
    const clubID = Clubs.collection.insert({ name, description, location, image, meetingTime, contactInfo });
    categories.forEach((category) => ClubInterests.collection.insert({ club: clubID, interest: category }));
    return clubID;
  },
  'Clubs.organizeEvent'({ clubID, eventID }) {
    ClubEvents.collection.insert({ clubId: clubID, eventId: eventID });
  },
});

const addEventMethod = 'Events.add';

Meteor.methods({
  'Events.add'({ title, description, date, location, createdBy, interests }) {
    const eventID = Events.collection.insert({ title, description, date, location, createdBy });
    interests.forEach((interest) => EventsInterests.collection.insert({ event: eventID, interest }));
    return eventID;
  },
});

Meteor.methods({
  'profileClubs.remove'(clubId) {
    check(clubId, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // Check if the club exists for the user
    const exists = ProfileClubs.collection.findOne({ userId: this.userId, clubId: clubId });

    // If it exists, remove it
    if (exists) {
      ProfileClubs.collection.remove({ userId: this.userId, clubId: clubId });
      console.log('Club removed successfully');
    } else {
      console.log('Club does not exist in profile');
    }
  },

  'profileClubs.add'(clubId) {
    check(clubId, String);
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
    } else {
      console.log('already exists');
    }
  },
});

export { updateProfileMethod, addClubMethod, addEventMethod };
