import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ProfileCollection. It encapsulates state and variable values for club.
 */
class EventClubsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'EventClubs';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      userId: String,
      eventId: String,
      clubId: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ClubsCollection.
 * @type {EventClubsCollection}
 */
export const EventClubs = new EventClubsCollection();
