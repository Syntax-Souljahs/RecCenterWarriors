import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class BuddyProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'BuddyProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      username: {
        type: String,
        unique: true,
        optional: true,
      },
      firstName: String,
      lastName: String,
      year: {
        type: String,
        allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate', 'Faculty'],
        defaultValue: 'Freshman',
      },
      major: String,
      email: String,
      interests: {
        type: String,
        allowedValues: ['General Health/Fitness', 'Bodybuilding/Aesthetics', 'Powerlifting', 'Crossfit', 'Other'],
        defaultValue: 'General Health/Fitness',
      },
      favoriteExercises: {
        type: String,
        optional: true,
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ProfilesCollection.
 * @type {BuddyProfilesCollection}
 */
export const BuddyProfiles = new BuddyProfilesCollection();
