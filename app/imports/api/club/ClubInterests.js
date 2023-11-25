import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ClubInterestsCollection. It encapsulates state and variable values for the relationship between clubs and interests.
 */
class ClubInterestsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ClubInterestsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      clubId: {
        type: String,
        label: "Club ID",
        // Consider adding custom validation or reference to the Clubs collection
      },
      interestId: {
        type: String,
        label: "Interest ID",
        // Consider adding custom validation or reference to the Interests collection
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
 * The singleton instance of the ClubInterestsCollection.
 * @type {ClubInterestsCollection}
 */
export const ClubInterests = new ClubInterestsCollection();
