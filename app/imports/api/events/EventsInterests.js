import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Encapsulates state and variable values for the EventsInterests collection. */
class EventsInterestsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'EventsInterestsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      eventId: {
        type: String,
        label: 'Event ID',
        // Consider adding custom validation or reference to the Events collection
      },
      interestId: {
        type: String,
        label: 'Interest ID',
        // Consider adding custom validation or reference to the Interests collection
      },
      // You can add additional fields if needed
    });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const EventsInterests = new EventsInterestsCollection();
