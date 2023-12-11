import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import fs from 'fs';
import path from 'path';
import { Events } from '../../api/events/Events';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfileClubs } from '../../api/profile/ProfileClubs';
import { EventClubs } from '../../api/events/EventClubs';

const addClubMethod = 'Clubs.add';

Meteor.methods({

  'Clubs.organizeEvent'({ clubID, eventID }) {
    EventClubs.collection.insert({ clubId: clubID, eventId: eventID });
  },
});

Meteor.methods({
  createUserProfile: function (userId, email, firstName, lastName) {
    check(userId, String);
    check(email, String);
    check(firstName, String);
    check(lastName, String);
    // const UH_ID = generateUH_ID();
    Profiles.collection.insert({
      // UH_ID,
      userId,
      email,
      // Set other fields to default values or leave them to be updated later
      firstName: firstName,
      lastName: lastName,
      bio: '',
      title: '',
      picture: '/images/defaultprofilepic.png', // Default profile picture
    });
  },
});

Meteor.methods({
  updateUserProfile(userId, profileData) {
    check(userId, String);
    check(profileData, {
      Firstname: String,
      Lastname: String,
      Email: String,
      Bio: String,
      Title: String,
    });

    // Ensure the user is logged in and updating their own profile
    if (this.userId !== userId) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action');
    }

    // Update the user's profile
    Profiles.collection.update(
      { userId: userId },
      { $set: { firstName: profileData.Firstname, lastName: profileData.Lastname, email: profileData.Email, bio: profileData.Bio, title: profileData.Title } },
    );
  },
});
function getEventIdsForClub(clubId) {
  check(clubId, String);

  const events = Events.collection.find({ eventId: clubId }).fetch();
  return events.map(event => event._id);
}

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
    }
  },
  'eventClubs.add'(clubId) {
    check(clubId, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // Logic to determine which events to link to the club
    const eventIds = getEventIdsForClub(clubId); // Implement this function based on your application logic

    eventIds.forEach(eventId => {
      const exists = EventClubs.collection.findOne({ eventId: eventId, clubId: clubId });
      if (!exists) {
        EventClubs.collection.insert({
          userId: this.userId,
          clubId: clubId,
        });
      }
    });
  },
});

Meteor.methods({
  uploadProfilePicture(userId, imageBuffer, imageName) {
    check(userId, String);
    check(imageBuffer, String);
    check(imageName, String);
    check(imageBuffer, Buffer);

    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'You must be logged in to perform this action');
    }

    if (!(imageBuffer instanceof Buffer)) {
      throw new Meteor.Error('invalid-argument', 'imageBuffer must be a Buffer');
    }

    // Ensure user is updating their own profile
    if (this.userId !== userId) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action');
    }

    const imagePath = path.join('../../../../../public/images/', imageName);

    try {
      // Write the image buffer to the public directory
      fs.writeFileSync(imagePath, imageBuffer);

      // Update the user's profile picture in the database
      Profiles.collection.update(
        { userId },
        { $set: { picture: `/images/${imageName}` } },
      );
    } catch (err) {
      throw new Meteor.Error('file-upload-failed', 'Failed to upload image');
    }
  },
});

export { addClubMethod };
