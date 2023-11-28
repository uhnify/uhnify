import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ProfilesEventsCollection. It encapsulates state and variable values for the relationship between profiles and events.
 */
class ProfilesEventsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesEventsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      profileId: {
        type: SimpleSchema.Integer, // Assuming the UH_ID from Profiles is used here
        label: 'Profile ID',
        // Consider adding custom validation or reference to the Profiles collection
      },
      eventId: {
        type: String, // Assuming a string identifier for events
        label: 'Event ID',
        // Consider adding custom validation or reference to the Events collection
      },
      // Additional fields can be added as needed, such as participation roles, dates, etc.
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against the schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ProfilesEventsCollection.
 * @type {ProfilesEventsCollection}
 */
export const ProfilesEvents = new ProfilesEventsCollection();
