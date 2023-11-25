import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ClubEventsCollection. It encapsulates state and variable values
 * for the relationship between clubs and events.
 */
class ClubEventsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ClubEventsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      clubId: {
        type: String,
        label: "Club ID",
        // Consider adding custom validation or reference to the Clubs collection
      },
      eventId: {
        type: String,
        label: "Event ID",
        // Consider adding custom validation or reference to the Events collection
      },
      // You can add additional fields if needed
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against the schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ClubEventsCollection.
 * @type {ClubEventsCollection}
 */
export const ClubEvents = new ClubEventsCollection();