import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ProfilesClubCollection. It encapsulates state and variable values for the relationship between profiles and clubs.
 */
class ProfilesClubCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesClubCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      profileId: {
        type: SimpleSchema.Integer, // Assuming the UH_ID from Profiles is used here
        label: "Profile ID",
        // Consider adding custom validation or reference to the Profiles collection
      },
      clubId: {
        type: String, // Assuming the clubID from Clubs is used here
        label: "Club ID",
        // Consider adding custom validation or reference to the Clubs collection
      },
      // You can add additional fields if needed, such as roles or dates of joining
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against the schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ProfilesClubCollection.
 * @type {ProfilesClubCollection}
 */
export const ProfilesClub = new ProfilesClubCollection();